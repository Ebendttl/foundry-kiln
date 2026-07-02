-- ============================================================================
-- FOUNDRY KILN — Migration 005: Auto Ledger Posting Triggers
-- Automatically creates transactions when module records are marked paid
-- ============================================================================

-- ============================================================================
-- STUDIO BOOKING → TRANSACTION (when status = 'completed' and paid)
-- ============================================================================
CREATE OR REPLACE FUNCTION fn_studio_booking_to_ledger()
RETURNS TRIGGER AS $$
DECLARE
  v_category_id UUID;
BEGIN
  -- Only fire when status changes to 'completed' and amount is paid
  IF NEW.status = 'completed' AND (OLD.status IS DISTINCT FROM 'completed') AND NEW.amount_paid > 0 THEN
    -- Find or use a default income category for The Booth
    SELECT c.id INTO v_category_id
    FROM categories c
    WHERE c.org_id = NEW.org_id
      AND c.business_unit_id = NEW.business_unit_id
      AND c.type = 'income'
    LIMIT 1;

    INSERT INTO transactions (
      org_id, business_unit_id, type, category_id,
      amount, currency, description, transaction_date,
      source, source_ref_id
    ) VALUES (
      NEW.org_id, NEW.business_unit_id, 'income', v_category_id,
      NEW.amount_paid, 'NGN',
      'Studio booking: ' || NEW.client_name || ' (' || NEW.booking_date::TEXT || ' ' || NEW.start_time::TEXT || '-' || NEW.end_time::TEXT || ')',
      NEW.booking_date,
      'booking', NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_studio_booking_ledger
  AFTER UPDATE ON studio_bookings
  FOR EACH ROW
  EXECUTE FUNCTION fn_studio_booking_to_ledger();

-- ============================================================================
-- MERCH ORDER → TRANSACTION (when status = 'delivered' and paid)
-- ============================================================================
CREATE OR REPLACE FUNCTION fn_merch_order_to_ledger()
RETURNS TRIGGER AS $$
DECLARE
  v_category_id UUID;
BEGIN
  IF NEW.status = 'delivered' AND (OLD.status IS DISTINCT FROM 'delivered') AND NEW.amount_paid > 0 THEN
    SELECT c.id INTO v_category_id
    FROM categories c
    WHERE c.org_id = NEW.org_id
      AND c.business_unit_id = NEW.business_unit_id
      AND c.type = 'income'
    LIMIT 1;

    INSERT INTO transactions (
      org_id, business_unit_id, type, category_id,
      amount, currency, description, transaction_date,
      source, source_ref_id
    ) VALUES (
      NEW.org_id, NEW.business_unit_id, 'income', v_category_id,
      NEW.amount_paid, 'NGN',
      'Merch order: ' || NEW.customer_name || ' (' || NEW.quantity::TEXT || ' units)',
      CURRENT_DATE,
      'order', NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_merch_order_ledger
  AFTER UPDATE ON merch_orders
  FOR EACH ROW
  EXECUTE FUNCTION fn_merch_order_to_ledger();

-- ============================================================================
-- COFFEE SUBSCRIPTION BILLING → TRANSACTION
-- (called manually or via pg_cron when a billing cycle completes)
-- ============================================================================
CREATE OR REPLACE FUNCTION fn_coffee_subscription_billing(p_subscription_id UUID, p_amount NUMERIC)
RETURNS UUID AS $$
DECLARE
  v_sub RECORD;
  v_category_id UUID;
  v_transaction_id UUID;
BEGIN
  SELECT * INTO v_sub FROM coffee_subscriptions WHERE id = p_subscription_id AND status = 'active';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Subscription % not found or not active', p_subscription_id;
  END IF;

  SELECT c.id INTO v_category_id
  FROM categories c
  WHERE c.org_id = v_sub.org_id
    AND c.business_unit_id = v_sub.business_unit_id
    AND c.type = 'income'
  LIMIT 1;

  INSERT INTO transactions (
    org_id, business_unit_id, type, category_id,
    amount, currency, description, transaction_date,
    source, source_ref_id
  ) VALUES (
    v_sub.org_id, v_sub.business_unit_id, 'income', v_category_id,
    p_amount, 'NGN',
    'Coffee subscription: ' || v_sub.customer_name || ' (' || v_sub.plan || ' ' || v_sub.bag_size || ')',
    CURRENT_DATE,
    'subscription', v_sub.id
  )
  RETURNING id INTO v_transaction_id;

  -- Advance next_delivery_date based on plan
  UPDATE coffee_subscriptions SET
    next_delivery_date = CASE v_sub.plan
      WHEN 'weekly' THEN v_sub.next_delivery_date + INTERVAL '7 days'
      WHEN 'biweekly' THEN v_sub.next_delivery_date + INTERVAL '14 days'
      WHEN 'monthly' THEN v_sub.next_delivery_date + INTERVAL '1 month'
    END
  WHERE id = p_subscription_id;

  RETURN v_transaction_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- AUDIT LOG TRIGGER for transactions
-- ============================================================================
CREATE OR REPLACE FUNCTION fn_audit_transaction()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (org_id, user_id, action, table_name, record_id, new_values)
    VALUES (NEW.org_id, auth.uid(), 'create', 'transactions', NEW.id, to_jsonb(NEW));
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (org_id, user_id, action, table_name, record_id, old_values, new_values)
    VALUES (NEW.org_id, auth.uid(), 'update', 'transactions', NEW.id, to_jsonb(OLD), to_jsonb(NEW));
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (org_id, user_id, action, table_name, record_id, old_values)
    VALUES (OLD.org_id, auth.uid(), 'delete', 'transactions', OLD.id, to_jsonb(OLD));
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_audit_transactions
  AFTER INSERT OR UPDATE OR DELETE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION fn_audit_transaction();

-- ============================================================================
-- DAILY SUMMARY REFRESH FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION fn_refresh_daily_summary(p_org_id UUID, p_date DATE DEFAULT CURRENT_DATE)
RETURNS VOID AS $$
BEGIN
  INSERT INTO daily_summaries (org_id, business_unit_id, summary_date, total_income, total_expense, transaction_count)
  SELECT
    t.org_id,
    t.business_unit_id,
    t.transaction_date,
    COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0),
    COUNT(*)
  FROM transactions t
  WHERE t.org_id = p_org_id
    AND t.transaction_date = p_date
  GROUP BY t.org_id, t.business_unit_id, t.transaction_date
  ON CONFLICT (org_id, business_unit_id, summary_date)
  DO UPDATE SET
    total_income = EXCLUDED.total_income,
    total_expense = EXCLUDED.total_expense,
    transaction_count = EXCLUDED.transaction_count,
    computed_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
