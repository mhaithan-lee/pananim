import React, { useState } from 'react';
import { ShieldCheck, Truck, Scale, MapPin, Mail, HelpCircle, CheckCircle, FileText, ArrowRight } from 'lucide-react';

interface InfoPageProps {
  onNavigate: (route: string) => void;
}

export const HowItWorksPage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Operational Guide</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0C3C2C' }}>How Pananim Wholesale Operates</h1>
          <p style={{ maxWidth: '640px', margin: '0.5rem auto 0 auto' }}>
            Bridging provincial farmers directly with commercial buyers through structured wholesale ordering, inspected growers, and consolidated transport.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '1rem' }}>For Buyers &amp; Retailers</h3>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: 1.6 }}>
              <li><strong>Discover Harvests:</strong> Browse available crop listings filtered by province, category, and minimum order quantities.</li>
              <li><strong>Verify Wholesale Terms:</strong> Review pricing tiers, pack sizes (crates or sacks), and estimated lead times.</li>
              <li><strong>Order &amp; Escrow:</strong> Settle payment securely into platform escrow via GCash, Maya, Card, or corporate bank transfer.</li>
              <li><strong>Track Physical Milestones:</strong> Follow timestamped dispatch and transit updates updated manually by drivers.</li>
              <li><strong>Inspect &amp; Review:</strong> Check scales upon delivery, confirm receipt, and publish a verified-purchase review.</li>
            </ol>
          </div>

          <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '1rem' }}>For Farmers &amp; Cooperatives</h3>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: 1.6 }}>
              <li><strong>Register &amp; Submit Evidence:</strong> Provide your RSBSA registration stub or cooperative CDA certificate.</li>
              <li><strong>List Harvest Batches:</strong> Set available stock, price tiers, and tentative harvest availability dates.</li>
              <li><strong>Receive Wholesale Orders:</strong> Accept incoming orders with confirmed buyer payment in holding.</li>
              <li><strong>Dispatch via Shared Cargo:</strong> Hand over produce to coordinated transport routes without individual high freight costs.</li>
              <li><strong>Receive Prompt Settlement:</strong> Net earnings are released to your registered account upon buyer receipt sign-off.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SellWithPananimPage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Farmer Recruitment</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0C3C2C' }}>Sell Your Harvest on Pananim</h1>
          <p style={{ maxWidth: '640px', margin: '0.5rem auto 0 auto' }}>
            Connect your farm directly with supermarkets, institutional buyers, and wholesale markets across Metro Manila and surrounding provinces.
          </p>
        </div>

        <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '1rem' }}>The Verification Checklist</h3>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Pananim awards the Reviewed Grower badge to maintain trust. You will need:
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0C3C2C' }}>
              <CheckCircle size={18} color="#1B7A43" /> Official RSBSA Farmer Registration OR Cooperative CDA Certificate
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0C3C2C' }}>
              <CheckCircle size={18} color="#1B7A43" /> Proof of Farm Cultivation / Tenancy Agreement (Land ownership not strictly required)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0C3C2C' }}>
              <CheckCircle size={18} color="#1B7A43" /> Recent clear photographs of crops on the ground or during staging
            </li>
          </ul>
          <button onClick={() => onNavigate('/register/farmer')} className="btn btn-accent btn-lg" style={{ fontWeight: 700 }}>
            Start Farmer Application &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeliveryCoveragePage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Logistics Corridors</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0C3C2C' }}>Service Areas &amp; Delivery Coverage</h1>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Pananim coordinates farm pickups across major Luzon agricultural provinces and delivers to key urban distribution centers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '1rem' }}>Active Sourcing Corridors</h3>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li><strong>Benguet (CAR):</strong> Highland cool-chain corridor (La Trinidad to Manila)</li>
              <li><strong>Nueva Ecija:</strong> Central Luzon allium and grain consolidation</li>
              <li><strong>Pangasinan:</strong> Lowland fruiting vegetables</li>
              <li><strong>Laguna:</strong> Volcanic valley fruit and citrus belt</li>
              <li><strong>Isabela:</strong> Cagayan Valley sweet corn and root tubers</li>
            </ul>
          </div>

          <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0C3C2C', marginBottom: '1rem' }}>Intake Destination Hubs</h3>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li><strong>Metro Manila (NCR):</strong> Balintawak, Divisoria, Quezon City hubs</li>
              <li><strong>Laguna / Cavite:</strong> Technopark and industrial commercial bays</li>
              <li><strong>Bulacan:</strong> Bocaue interchange aggregation center</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutPage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>About Pananim</span>
          <h1 style={{ fontSize: '2.5rem', color: '#0C3C2C' }}>Bridging Farms &amp; Markets</h1>
          <p style={{ maxWidth: '620px', margin: '0.5rem auto 0 auto' }}>
            Stabilizing food prices and empowering Filipino growers through digital transparency.
          </p>
        </div>

        <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '1rem' }}>Project Background &amp; Purpose</h3>
          <p style={{ lineHeight: 1.7, fontSize: '0.95rem', color: '#574A46', marginBottom: '1.25rem' }}>
            Pananim was conceived as an academic and technological response to the systemic inefficiencies of the Philippine agricultural food supply chain. Smallholder farmers often receive meager farmgate prices while urban consumers face hyper-inflated retail costs due to multiple unregulated middlemen.
          </p>
          <p style={{ lineHeight: 1.7, fontSize: '0.95rem', color: '#574A46' }}>
            By combining transparent regional wholesale benchmark prices with direct farmer-to-buyer transactions and shared freight logistics, Pananim fosters fair trade economics for those who feed the nation.
          </p>
        </div>

        {/* Project Team */}
        <div className="card" style={{ padding: '2rem', backgroundColor: '#FAF6F0', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D48216', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            ACADEMIC PROJECT DEVELOPERS
          </span>
          <h4 style={{ fontSize: '1.3rem', color: '#0C3C2C', margin: '0.5rem 0 1rem 0' }}>Group 4 Capstone Team</h4>
          <p style={{ fontWeight: 600, color: '#0C3C2C', fontSize: '1rem' }}>
            Caliuag &bull; Carmona &bull; Dumagjug &bull; Regalario &bull; Rodriguez &bull; Viray
          </p>
        </div>
      </div>
    </div>
  );
};

export const HelpPage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Pananim Help Center</h1>
        <p style={{ marginBottom: '2rem' }}>Frequently asked questions and wholesale support guidance.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ color: '#0C3C2C', marginBottom: '0.5rem' }}>How are refunds processed for spoiled produce?</h4>
            <p style={{ fontSize: '0.875rem' }}>Submit an issue report with scale and crop photos within 24 hours of delivery. Once verified, refund credits are returned via your original payment channel.</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ color: '#0C3C2C', marginBottom: '0.5rem' }}>Can I cancel a wholesale order once placed?</h4>
            <p style={{ fontSize: '0.875rem' }}>Orders can be freely canceled before the farmer confirms and begins harvest packaging. Once dispatched into physical transit, standard dispute rules apply.</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ color: '#0C3C2C', marginBottom: '0.5rem' }}>What payment methods are supported?</h4>
            <p style={{ fontSize: '0.875rem' }}>GCash, Maya, credit/debit card demo, and corporate bank transfer with unique reconciliation references.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '580px' }}>
        <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>Contact Platform Support</h2>
          <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Have a question regarding farmer verification or delivery coordination?
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry message submitted. Support will reply via email.'); onNavigate('/'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>Full Name *</label>
              <input type="text" defaultValue="Mateo Rodriguez" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>Email Address *</label>
              <input type="email" defaultValue="mateo.r@freshmarkets.ph" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.25rem' }}>Message *</label>
              <textarea rows={4} placeholder="Describe your inquiry..." required />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ fontWeight: 700 }}>
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const PoliciesPage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#0C3C2C', marginBottom: '1rem' }}>Marketplace Policies &amp; Terms</h1>
        <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
          <section>
            <h3 style={{ color: '#0C3C2C', marginBottom: '0.5rem' }}>1. Wholesale Transaction Terms</h3>
            <p>Pananim functions as an intermediary marketplace connecting buyers with independent farmers and cooperatives. All crop orders represent binding wholesale sales once harvest preparation is confirmed.</p>
          </section>
          <section>
            <h3 style={{ color: '#0C3C2C', marginBottom: '0.5rem' }}>2. Weight Discrepancies &amp; Spoilage</h3>
            <p>Because produce is subject to natural transit dehydration, natural weight shrinkage up to 2.5% is recognized. Shortages exceeding this threshold or damaged produce must be documented with photos within 24 hours of arrival.</p>
          </section>
          <section>
            <h3 style={{ color: '#0C3C2C', marginBottom: '0.5rem' }}>3. Farmer Evidence &amp; Verification Badge</h3>
            <p>The &ldquo;Farmer Identity and Farm Evidence Reviewed by Pananim&rdquo; badge verifies that identity and land records were checked against registries. It does not constitute a state-sponsored organic certification or quality warranty.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
