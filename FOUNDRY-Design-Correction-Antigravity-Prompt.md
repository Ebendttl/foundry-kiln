# FOUNDRY — Design Correction
### Why the last build looks like a terminal, not an award-winning site — and the fix

---

## 0. You're right, and here's exactly what went wrong

Looking at the screenshots against what I asked for, Antigravity took "industrial, hard-edged, mono-accented" and ran it to a literal extreme instead of a *tasteful* one. Every specific failure traces back to a spec I under-constrained:

| What's on screen | Why it happened | What "award-winning" actually requires instead |
|---|---|---|
| Entire headlines, nav, body copy, and buttons in monospace ALL CAPS | I said "IBM Plex Mono for prices, timestamps, labels" but didn't forbid it everywhere else, so it spread to every line of text on the page | Mono type is a **seasoning, not the meal** — it belongs on micro-labels, prices, and metadata only. Headlines need a confident, large-scale grotesk sans in mixed case (all-caps only for very short 1–3 word tags/eyebrows) |
| Hero sections are empty dark boxes with one small centered line-icon (a mic, a coffee cup, a printer) | I never explicitly required populated photography/texture in the hero — Antigravity defaulted to "no stock photo available" and drew a placeholder icon instead | Every hero needs **real visual weight**: actual photography (even tasteful AI-generated or licensed placeholder imagery), a grain/halftone texture overlay, or at minimum a rich generative gradient/pattern — never a bare icon floating in an empty box |
| The orange ticker strip is loud, appears to dominate the viewport, and repeats the same visual weight as the hero | I asked for a marquee ticker but didn't constrain its height, frequency of appearance, or restraint relative to the rest of the page | A ticker is a **thin, quiet accessory** — under 40px tall, one instance sitewide (not re-triggered per page load in a way that feels heavy), lower contrast than primary content |
| No clear type hierarchy — headline, body, and labels all feel like similar visual weight | I gave color and corner-radius rules but never gave an actual **type scale** with real size jumps | Award-winning sites read in under 2 seconds because of scale contrast: a 72–120px display headline against 16–18px body text isn't a suggestion, it's the entire mechanism by which hierarchy communicates |
| Content is cramped edge-to-edge, sections don't breathe, forms are dense stacked fields with barely visible borders | I never specified a spacing scale or minimum section padding | Needs an explicit spacing scale and a **minimum vertical rhythm** between sections, plus real input-field contrast in dark mode (not a 1px border that's nearly the same value as the background) |
| Every accent color reads as the same saturated neon regardless of section | I gave per-unit accent colors but no rule about *how much* of each screen should carry that saturation | Color needs to be **rationed** — one saturated accent per screen used sparingly (a button, an underline, a tag), with everything else resting on a quiet neutral base |

The underlying lesson: "industrial and hard-edged" was the right *direction*, but I described it entirely in terms of what to avoid (soft, rounded, warm) and never described what *good* looks like in that lane. Antigravity filled the gap with the most literal interpretation available — a code-editor aesthetic — because I gave it a personality without giving it craft standards.

---

## 1. The corrected design system

This replaces Section 5 ("Design System") from the previous document in full. Same brand, same off-black/concrete/signal-orange palette, same per-unit accents — but now specified with the craft constraints that were missing.

### Type scale (the fix that matters most)
| Role | Typeface | Size (desktop) | Case | Weight |
|---|---|---|---|---|
| Hero display | Space Grotesk | 88–128px, tight leading (0.95) | Mixed case, sentence-style | 700 |
| Section headline | Space Grotesk | 40–56px | Mixed case | 700 |
| Card/subsection title | Space Grotesk | 22–28px | Mixed case | 600 |
| Body copy | IBM Plex Sans | 16–18px, 1.6 line-height | Sentence case | 400 |
| Eyebrow/tag (e.g. "THE ROAST") | IBM Plex Mono | 11–12px, letter-spacing 0.08em | UPPERCASE — this is the *only* place uppercase mono belongs at this size | 500 |
| Price/timestamp/status label | IBM Plex Mono | 14–16px | As-written (₦6,500, not caps) | 500 |
| Button label | IBM Plex Mono | 13–14px, letter-spacing 0.05em | UPPERCASE, short (2–3 words max) | 600 |

**Rule Antigravity must follow without exception: monospace type never appears in a paragraph, a nav link, or more than roughly 4 words in a row.** If a string of mono text would wrap to a second line, it's in the wrong typeface — swap it to Space Grotesk or Plex Sans immediately.

### Spacing scale
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160` (px). Minimum vertical padding between major homepage sections: **96px mobile, 160px desktop**. Minimum internal card padding: **24px**. No content should ever touch a container edge — 24px minimum side gutter on mobile, content max-width of 1280–1440px on desktop with generous side margins beyond that.

### Color rationing
Per screen, use the saturated accent (signal orange, or the active unit's accent) in **no more than 2–3 discrete places**: one primary CTA, one active-state indicator (underline, tag border), maybe one highlighted stat. Everything else sits on off-black (`#121212`), a slightly lighter elevated surface (`#1A1A1A` for cards), raw concrete (`#EDEBE6`) for light sections, and a mid-gray (`#8A8A8A`) for secondary/muted text. If a screen feels like it's shouting, remove an accent instance, don't add contrast elsewhere to compensate.

### Photography & imagery — mandatory, not optional
Every hero and every product/unit card must contain **real visual content**, not an icon in an empty box:
- The Booth: photography of an actual studio interior — mic on a boom arm, acoustic panels, a mixing desk — processed in high-contrast duotone (off-black + violet tint).
- The Line: photography of physical print product — folded t-shirts, a stack of business cards, a sticker sheet — duotone in off-black + ink red, or a halftone-dot overlay to reinforce "screen print" texture.
- The Roast: photography of coffee — beans, a pour-over, roasted batches — allowed the warmest, most natural color treatment on the site (this is the intentional one soft moment).
If real photography isn't available yet, use a tasteful, correctly-lit placeholder image in the right subject matter and color treatment — never a bare centered icon on a flat background. An icon can accompany a photo as a small badge; it cannot replace the photo.

### Ticker strip — corrected spec
Height: 32–36px max. Font: Plex Mono, 12px, uppercase, letter-spacing 0.08em. Background: signal orange at full saturation is fine *here specifically* because the strip is thin — but text color should be off-black (not white) for a printed-label feel, and the strip appears **once**, directly under the header, never repeated mid-page.

### Component polish standards
- **Buttons:** sharp rectangle, 2px border, generous horizontal padding (24–32px), 48px min height for tap targets, hover inverts fill/text with a 150ms transition — no more, no less.
- **Form inputs:** dark surface `#1A1A1A` against a `#3A3A3A` border (not near-invisible), 16px label above field in Plex Sans (not mono), focus state uses the active unit's accent as a 2px border glow, generous 16px internal padding.
- **Cards:** 24px padding minimum, a single accent-colored top border (4px) rather than a border on all four sides to avoid the "table cell" look the screenshots have now, real imagery in every card that references a physical product or space.
- **Micro-interactions:** the glitch/RGB-split hover effect should be brief (under 200ms) and subtle (2–3px offset max) — it's a wink, not a distraction.

---

## 2. THE REVISED ANTIGRAVITY PROMPT
### (this replaces the DESIGN DIRECTION section from the previous prompt — paste the corrected block in place of it, or paste this whole prompt fresh)

```
You are acting as a senior full-stack engineer AND an award-winning digital designer — think the
craft level of an Awwwards Site of the Day, not a developer's default dark theme. Build "Kiln" —
the unified operations-and-storefront platform for FOUNDRY COLLECTIVE LIMITED, a Lagos
creative-economy company operating three production units under one roof: a studio-rental
business ("The Booth"), a custom print and merch production business ("The Line"), and a
specialty coffee roastery and subscription business ("The Roast").

=== DESIGN DIRECTION — READ THIS SECTION AS CRAFT CONSTRAINTS, NOT SUGGESTIONS ===
The aesthetic is industrial-creative (off-black, raw concrete, signal orange, hard edges, one
warm moment at The Roast) — but "industrial" means confident and considered, NOT a code editor
or spreadsheet. Follow every rule below without exception:

TYPE SCALE (the most important rule in this brief): headlines and body copy are set in Space
Grotesk (headlines, 700 weight, 88-128px hero / 40-56px section, mixed case, sentence-style —
NOT all-caps except for 1-3 word tags) and IBM Plex Sans (body copy, 16-18px, sentence case).
IBM Plex Mono is reserved EXCLUSIVELY for: eyebrow tags under 3 words (uppercase), prices,
timestamps, status labels, and button labels under 3 words (uppercase). Monospace type must
NEVER appear in a full sentence, a paragraph, a nav link, or anything that would wrap past one
short line — if you catch yourself setting a full nav menu or a headline in mono, stop and use
Space Grotesk instead. This single rule is what separates a designed product from a terminal
theme, and it was violated in the previous build.

IMAGERY IS MANDATORY: every hero section and every unit/product card must contain real
photographic or richly textured visual content — a studio interior with visible equipment for
The Booth, physical printed product (folded apparel, stacked cards, sticker sheets) for The
Line, coffee/beans/roasting imagery for The Roast. Process images in high-contrast duotone using
the relevant unit's accent color, or a halftone-dot overlay for The Line specifically. NEVER
render a hero or card as an empty dark box with a single small centered line-icon floating in
the middle — that reads as an unfinished placeholder, not a design choice. If real photography
isn't available, use a well-composed, correctly color-treated placeholder image of the right
subject matter; an icon may accompany an image as a small corner badge but must never replace it.

SPACING AND BREATHING ROOM: use an 4/8/12/16/24/32/48/64/96/128/160px spacing scale. Minimum
vertical gap between major homepage sections is 96px on mobile and 160px on desktop. Minimum
card padding is 24px. Content never touches a container edge — minimum 24px side gutters on
mobile, and a 1280-1440px max content width with real margin beyond that on desktop. The previous
build was cramped edge-to-edge; every section here needs to visibly breathe.

COLOR RATIONING: the saturated signal-orange accent (or the active unit's accent color) appears
in no more than 2-3 discrete places per screen — one primary CTA, one active-state indicator,
maybe one highlighted stat or price. The rest of every screen rests on off-black (#121212),
a slightly elevated card surface (#1A1A1A), raw concrete (#EDEBE6) for light sections, and
mid-gray (#8A8A8A) for secondary text. If a screen feels visually loud, the fix is removing an
accent instance, not adding more contrast elsewhere.

TICKER STRIP: a single thin marquee strip, 32-36px tall max, directly under the header, appearing
once sitewide (not repeated per page in a way that competes with the hero). 12px uppercase Plex
Mono text, letter-spacing 0.08em, off-black text on the signal-orange background (not white text)
for a printed-label feel. This strip must never be taller than or visually compete with the hero
content below it.

COMPONENT POLISH: buttons are sharp rectangles with a 2px border, 24-32px horizontal padding, 48px
minimum tap-target height, and a 150ms hover transition that inverts fill/text — nothing longer,
nothing bouncier. Form inputs sit on a #1A1A1A surface with a clearly visible #3A3A3A border (not
a near-invisible 1px line), 16px Plex Sans labels above each field (never mono), and a 2px accent
glow on focus. Cards get a single 4px accent-colored top border rather than borders on all four
sides (all-sides borders is what made the previous build look like a spreadsheet), 24px internal
padding minimum, and always contain real imagery per the IMAGERY IS MANDATORY rule above. Any
glitch/RGB-split hover flourish is brief (under 200ms) and subtle (2-3px offset max) — a wink,
not a distraction.

Brand palette (unchanged): off-black #121212, raw concrete #EDEBE6, signal orange #FF4B12 spine;
The Booth = electric violet #7B2FF7; The Line = ink red #E4002B; The Roast = caramel #C08A3E on
a deep espresso-brown #3B2314 base for that unit specifically (the one deliberately warmer,
softer moment on the site). Hard/mostly-square corners (0-4px radius), hard offset shadows or
visible borders instead of soft blur elevation, asymmetric hero layouts, a staggered/offset
homepage unit-card grid — all of this from the original brief still stands; what's corrected here
is execution discipline, not direction.

[... continue with the full ARCHITECTURE, DATA MODEL, ROLES, TECH STACK, KILN FLOOR pages, KILN
OPS pages, NON-FUNCTIONAL REQUIREMENTS, and GITHUB REPOSITORY sections exactly as specified in
the previous Foundry/Kiln prompt — none of that changes. Only the DESIGN DIRECTION section above
replaces the prior version.]

=== DELIVERABLE FOR THIS SESSION ===
Before writing any page code, first build a small visual style-check: render the type scale (one
example of a hero headline, a section headline, body copy, an eyebrow tag, and a price) together
on one screen so the hierarchy and the mono-vs-sans rule are visibly correct before anything else
gets built on top of it. Once that's confirmed, proceed to scaffold the Turborepo, the Supabase
schema, the (ops) Auth flow and Owner Dashboard, and the (floor) Homepage and The Booth page as
previously specified — holding every page to the craft constraints above, especially the imagery
and spacing rules, since those were the two most visibly broken elements in the prior build.
```

---

## 3. One honest note

The fastest way to sanity-check the next build before you're several pages deep: ask Antigravity to render just the homepage hero and one unit card first, and look specifically for three things — (1) is the headline in Space Grotesk, not mono, (2) is there an actual photo or rich texture behind it, not an empty box with an icon, (3) does the section have real breathing room around it. If those three are right, the rest of the site will very likely follow the same discipline. If any of the three is wrong, it's worth stopping and correcting before more pages get built on the same mistake.
