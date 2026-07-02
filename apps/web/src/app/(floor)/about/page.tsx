import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Foundry',
  description: 'Learn about Foundry Collective Limited and our Lagos creative-economy production floor.',
};

export default function AboutPage() {
  return (
    <section className="bg-surface-primary py-20 min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="label-mono text-foundry-orange block mb-3">Our Mission</span>
        <h1 className="heading-foundry text-5xl text-foundry-concrete mb-8">About Foundry</h1>
        
        <div className="space-y-6 text-text-secondary leading-relaxed font-body">
          <p className="text-lg text-foundry-concrete">
            Foundry Collective Limited is a Lagos-based creative-economy infrastructure company. We design and operate physical production spaces that unite distinct creative and light-manufacturing activities under a single roof.
          </p>
          <p>
            Our core belief is simple: <strong>raw talent deserves real output.</strong> By clustering tools, space, and community, we remove the friction points that prevent local creators from shipping professional-grade work.
          </p>
          
          <div className="divider-tear" />
          
          <h2 className="heading-foundry text-2xl text-foundry-concrete uppercase">The Production Units</h2>
          <p>
            Each Foundry building hosts a combination of service-based, custom-manufactured, and retail units:
          </p>
          <ul className="space-y-4 pt-2">
            <li>
              <strong className="text-booth-violet">The Booth</strong>: A high-performance audio/video rental facility with acoustically designed podcast rooms, soundproof music suites, and Cyc wall photo studios.
            </li>
            <li>
              <strong className="text-line-red">The Line</strong>: A custom design and manufacturing unit specializing in high-quality textile screen-printing, custom apparel runs, and specialty business printing.
            </li>
            <li>
              <strong className="text-roast-caramel">The Roast</strong>: A micro-roastery and café bar dedicated to sourcing top-tier green coffee beans, roasting locally in small batches, and managing subscriptions.
            </li>
          </ul>

          <div className="divider-tear" />

          <h2 className="heading-foundry text-2xl text-foundry-concrete uppercase">Operational Rigor</h2>
          <p>
            Behind the floor is <strong>Kiln</strong>, our unified custom operations platform. Every time-slot booking at The Booth, every bulk apparel run on The Line, and every bag roasted at The Roast is recorded directly to our unified ledger, ensuring real-time business visibility and zero-paper operations.
          </p>
        </div>
      </div>
    </section>
  );
}
