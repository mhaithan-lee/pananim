import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Scale, 
  MapPin, 
  Mail, 
  HelpCircle, 
  CheckCircle, 
  FileText, 
  ArrowRight,
  Sprout,
  Leaf,
  MessageSquare,
  Globe,
  Award,
  Sparkles,
  Users,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

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
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* 1. HERO BANNER */}
      <div 
        style={{ 
          position: 'relative',
          backgroundImage: 'linear-gradient(to right, rgba(12, 60, 44, 0.94) 0%, rgba(12, 60, 44, 0.82) 55%, rgba(12, 60, 44, 0.45) 100%), url("/images/about-hero-farmer.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          color: '#FFFFFF',
          padding: '5rem 0 6rem 0',
          borderBottom: '3px solid #D48216'
        }}
      >
        <div className="container" style={{ maxWidth: '1160px', position: 'relative', zIndex: 2 }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
            <span style={{ color: '#D48216', fontWeight: 900, fontSize: '1.2rem', lineHeight: 1 }}>—</span>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: '#F4ECE1', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em' 
            }}>
              ABOUT PANANIM &middot; ROOTED LOCALLY, GROWING TOGETHER
            </span>
          </div>

          {/* Heading */}
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', 
            fontWeight: 900, 
            color: '#FFFFFF', 
            letterSpacing: '-0.03em', 
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            maxWidth: '820px'
          }}>
            Bridging Farms &amp; Markets
          </h1>

          {/* Subtitle */}
          <p style={{ 
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)', 
            color: '#E6DFD5', 
            maxWidth: '680px', 
            lineHeight: 1.65,
            fontWeight: 400
          }}>
            Connecting Filipino farmers directly with buyers—so good harvests can find better markets, and every connection begins with the grower.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1160px', marginTop: '4rem' }}>
        {/* 2. THE PEOPLE BEHIND EVERY HARVEST */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '3.5rem', 
            alignItems: 'center' 
          }}>
            {/* Left Column: Story */}
            <div>
              <span style={{ 
                fontSize: '0.78rem', 
                fontWeight: 800, 
                color: '#C86B14', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '0.65rem'
              }}>
                THE PEOPLE BEHIND EVERY HARVEST
              </span>
              <h2 style={{ 
                fontSize: 'clamp(2rem, 3.2vw, 2.7rem)', 
                color: '#0C3C2C', 
                fontWeight: 900, 
                letterSpacing: '-0.025em', 
                lineHeight: 1.2,
                marginBottom: '1.5rem'
              }}>
                A closer connection to the source.
              </h2>
              <p style={{ fontSize: '1.025rem', color: '#574A46', lineHeight: 1.75, marginBottom: '1.15rem' }}>
                Pananim is a farm-to-market platform built around a simple idea: the people who grow our food should be closer to the people who buy it.
              </p>
              <p style={{ fontSize: '0.98rem', color: '#574A46', lineHeight: 1.75, marginBottom: '2rem' }}>
                We bring crop listings, price references, and delivery coordination into one connected space. Farmers can share what is available, buyers can find local produce, and both can discuss the details directly.
              </p>

              {/* Accent Quote Callout */}
              <div style={{ 
                borderLeft: '4px solid #D48216', 
                paddingLeft: '1.15rem', 
                color: '#0C3C2C', 
                fontWeight: 800, 
                fontSize: '1.25rem',
                letterSpacing: '-0.01em',
                lineHeight: 1.4
              }}>
                Fewer middlemen. More shared value.
              </div>
            </div>

            {/* Right Column: Authentic Image */}
            <div>
              <div style={{ 
                borderRadius: '18px', 
                overflow: 'hidden', 
                boxShadow: '0 12px 35px rgba(12, 60, 44, 0.12)', 
                border: '1.5px solid #DECDBD',
                backgroundColor: '#FFFFFF',
                aspectRatio: '4 / 3'
              }}>
                <img 
                  src="/images/about-farmer-buyer.jpg" 
                  alt="Filipino farmer and buyer discussing fresh produce at farm stall"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <p style={{ 
                textAlign: 'center', 
                fontSize: '0.825rem', 
                color: '#8A7B76', 
                marginTop: '0.85rem', 
                fontStyle: 'italic' 
              }}>
                From local harvests to direct conversations.
              </p>
            </div>
          </div>
        </section>

        {/* 3. MISSION & VISION CARDS */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            {/* Card 1: Mission */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              padding: '2.5rem 2.25rem', 
              border: '1.5px solid #DECDBD',
              boxShadow: '0 4px 20px rgba(12, 60, 44, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '12px', 
                  backgroundColor: '#E2ECE5', 
                  color: '#1B7A43', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0 
                }}>
                  <Sprout size={24} />
                </div>
                <span style={{ 
                  fontSize: '0.74rem', 
                  fontWeight: 800, 
                  color: '#BA4B24', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em' 
                }}>
                  OUR MISSION
                </span>
              </div>
              <h3 style={{ 
                fontSize: '1.55rem', 
                color: '#0C3C2C', 
                fontWeight: 800, 
                marginBottom: '0.85rem',
                letterSpacing: '-0.01em'
              }}>
                Make direct trade more accessible.
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#574A46', lineHeight: 1.7, margin: 0 }}>
                To connect Filipino farmers with buyers through clear crop information, transparent price references, and coordinated logistics—reducing unnecessary layers between the farm and the market.
              </p>
            </div>

            {/* Card 2: Vision */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              padding: '2.5rem 2.25rem', 
              border: '1.5px solid #DECDBD',
              boxShadow: '0 4px 20px rgba(12, 60, 44, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '12px', 
                  backgroundColor: '#E2ECE5', 
                  color: '#1B7A43', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0 
                }}>
                  <Globe size={24} />
                </div>
                <span style={{ 
                  fontSize: '0.74rem', 
                  fontWeight: 800, 
                  color: '#BA4B24', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em' 
                }}>
                  OUR VISION
                </span>
              </div>
              <h3 style={{ 
                fontSize: '1.55rem', 
                color: '#0C3C2C', 
                fontWeight: 800, 
                marginBottom: '0.85rem',
                letterSpacing: '-0.01em'
              }}>
                A more connected food system.
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#574A46', lineHeight: 1.7, margin: 0 }}>
                A future where Filipino farmers have better access to markets, buyers know where their food comes from, and local communities can grow through fairer, more informed connections.
              </p>
            </div>
          </div>
        </section>

        {/* 4. HOW THE CONNECTION WORKS */}
        <section style={{ marginBottom: '5.5rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#C86B14', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '0.35rem'
            }}>
              A DIRECT PATH FROM FARM TO MARKET
            </span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', 
              color: '#0C3C2C', 
              fontWeight: 900, 
              letterSpacing: '-0.025em',
              marginBottom: '0.45rem'
            }}>
              How the connection works
            </h2>
            <p style={{ fontSize: '1rem', color: '#574A46', margin: 0 }}>
              Discover the harvest. Talk to the grower. Coordinate the journey.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', 
            gap: '2rem' 
          }}>
            {/* Step 01 */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              padding: '2.25rem 2rem', 
              border: '1.5px solid #DECDBD',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 18px rgba(12, 60, 44, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '12px', 
                  backgroundColor: '#E2ECE5', 
                  color: '#1B7A43', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Leaf size={24} />
                </div>
                <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#C89B65', lineHeight: 1 }}>
                  01
                </span>
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', fontWeight: 800, marginBottom: '0.75rem' }}>
                Farmers share their harvest
              </h3>
              <p style={{ fontSize: '0.925rem', color: '#574A46', lineHeight: 1.65, marginBottom: '1.75rem', flexGrow: 1 }}>
                Farmers list crops with their location, price, available quantity, and harvest details. Buyers can see what is ready at the source.
              </p>
              <button 
                type="button"
                onClick={() => onNavigate('/marketplace')}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#0C3C2C', 
                  fontWeight: 700, 
                  fontSize: '0.85rem',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>Crop listings &amp; availability</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Step 02 */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              padding: '2.25rem 2rem', 
              border: '1.5px solid #DECDBD',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 18px rgba(12, 60, 44, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '12px', 
                  backgroundColor: '#E2ECE5', 
                  color: '#1B7A43', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <MessageSquare size={24} />
                </div>
                <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#C89B65', lineHeight: 1 }}>
                  02
                </span>
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', fontWeight: 800, marginBottom: '0.75rem' }}>
                Buyers connect directly
              </h3>
              <p style={{ fontSize: '0.925rem', color: '#574A46', lineHeight: 1.65, marginBottom: '1.75rem', flexGrow: 1 }}>
                Buyers browse crops, compare price references, and speak with the farmer to confirm quality, quantity, availability, and the final price.
              </p>
              <button 
                type="button"
                onClick={() => onNavigate('/buyer/messages')}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#0C3C2C', 
                  fontWeight: 700, 
                  fontSize: '0.85rem',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>Direct conversations &amp; clear terms</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Step 03 */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              padding: '2.25rem 2rem', 
              border: '1.5px solid #DECDBD',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 18px rgba(12, 60, 44, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '12px', 
                  backgroundColor: '#E2ECE5', 
                  color: '#1B7A43', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Truck size={24} />
                </div>
                <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#C89B65', lineHeight: 1 }}>
                  03
                </span>
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', fontWeight: 800, marginBottom: '0.75rem' }}>
                Together, coordinate delivery
              </h3>
              <p style={{ fontSize: '0.925rem', color: '#574A46', lineHeight: 1.65, marginBottom: '1.75rem', flexGrow: 1 }}>
                Farmers and buyers arrange pickup or delivery with logistics providers, keeping the movement of each order clear and coordinated.
              </p>
              <button 
                type="button"
                onClick={() => onNavigate('/delivery-coverage')}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#0C3C2C', 
                  fontWeight: 700, 
                  fontSize: '0.85rem',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>Pickup, delivery &amp; status updates</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* 5. WHAT WE PUT AT THE HEART OF PANANIM */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#C86B14', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '0.35rem'
            }}>
              ONE NETWORK. SHARED GROWTH.
            </span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', 
              color: '#0C3C2C', 
              fontWeight: 900, 
              letterSpacing: '-0.025em',
              margin: 0
            }}>
              What we put at the heart of Pananim
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {/* Pillar 1 */}
            <div>
              <div style={{ width: '42px', height: '3.5px', backgroundColor: '#D48216', borderRadius: '2px', marginBottom: '1.15rem' }} />
              <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', fontWeight: 800, marginBottom: '0.65rem' }}>
                Farmers at the center
              </h3>
              <p style={{ fontSize: '0.925rem', color: '#574A46', lineHeight: 1.65, margin: 0 }}>
                Keep the grower visible in every listing and give farmers a direct way to reach potential buyers.
              </p>
            </div>

            {/* Pillar 2 */}
            <div>
              <div style={{ width: '42px', height: '3.5px', backgroundColor: '#D48216', borderRadius: '2px', marginBottom: '1.15rem' }} />
              <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', fontWeight: 800, marginBottom: '0.65rem' }}>
                Clarity before commitment
              </h3>
              <p style={{ fontSize: '0.925rem', color: '#574A46', lineHeight: 1.65, margin: 0 }}>
                Make crop details and price references easy to understand, with final terms agreed directly.
              </p>
            </div>

            {/* Pillar 3 */}
            <div>
              <div style={{ width: '42px', height: '3.5px', backgroundColor: '#D48216', borderRadius: '2px', marginBottom: '1.15rem' }} />
              <h3 style={{ fontSize: '1.35rem', color: '#0C3C2C', fontWeight: 800, marginBottom: '0.65rem' }}>
                Coordination that connects
              </h3>
              <p style={{ fontSize: '0.925rem', color: '#574A46', lineHeight: 1.65, margin: 0 }}>
                Bring farmers, buyers, and logistics providers into a clearer farm-to-market journey.
              </p>
            </div>
          </div>
        </section>

        {/* 6. ENRICHMENT: PHILIPPINE AGRICULTURAL IMPACT & ACTIVE CORRIDORS */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ 
            backgroundColor: '#FAF5EE', 
            borderRadius: '16px', 
            border: '1.5px solid #DECDBD',
            padding: '2.5rem',
            boxShadow: '0 4px 20px rgba(12, 60, 44, 0.04)'
          }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2rem auto' }}>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Empowering Filipino Agriculture</span>
              <h3 style={{ fontSize: '1.75rem', color: '#0C3C2C', fontWeight: 900, marginBottom: '0.5rem' }}>
                Transforming the Supply Chain with Transparency
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#574A46', margin: 0, lineHeight: 1.6 }}>
                Every kilogram traded through Pananim directly empowers local agricultural producers while stabilizing retail food security across Philippine commercial hubs.
              </p>
            </div>

            {/* 4 Stats Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #EBE4DA', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1B7A43', marginBottom: '0.2rem' }}>0%</div>
                <strong style={{ fontSize: '0.85rem', color: '#0C3C2C', display: 'block' }}>Arbitrary Markup</strong>
                <span style={{ fontSize: '0.74rem', color: '#8A7B76' }}>Transparent farmgate pricing directly agreed with growers</span>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #EBE4DA', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D48216', marginBottom: '0.2rem' }}>100%</div>
                <strong style={{ fontSize: '0.85rem', color: '#0C3C2C', display: 'block' }}>RSBSA &amp; CDA Vetted</strong>
                <span style={{ fontSize: '0.74rem', color: '#8A7B76' }}>Integrated with DA farmer credentials &amp; cooperative IDs</span>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #EBE4DA', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0C3C2C', marginBottom: '0.2rem' }}>24-48h</div>
                <strong style={{ fontSize: '0.85rem', color: '#0C3C2C', display: 'block' }}>Farm-to-Kitchen Transit</strong>
                <span style={{ fontSize: '0.74rem', color: '#8A7B76' }}>Minimized post-harvest spoilage via scheduled regional hubs</span>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #EBE4DA', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#BA4B24', marginBottom: '0.2rem' }}>Daily</div>
                <strong style={{ fontSize: '0.85rem', color: '#0C3C2C', display: 'block' }}>Price Benchmark</strong>
                <span style={{ fontSize: '0.74rem', color: '#8A7B76' }}>Live market price references for informed wholesale deals</span>
              </div>
            </div>

            {/* Regional Sourcing Corridors */}
            <div style={{ borderTop: '1px solid #EBE4DA', paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={18} color="#D48216" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0C3C2C', display: 'block' }}>Benguet Highlands:</strong>
                  <span style={{ color: '#574A46' }}>La Trinidad, Buguias, Atok cool-chain brassicas, carrots &amp; potatoes.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={18} color="#1B7A43" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0C3C2C', display: 'block' }}>Central Luzon Plains:</strong>
                  <span style={{ color: '#574A46' }}>Nueva Ecija onions, Bulacan tomatoes, Pangasinan highland peppers.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={18} color="#BA4B24" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0C3C2C', display: 'block' }}>Southern Tagalog Belt:</strong>
                  <span style={{ color: '#574A46' }}>Cavite and Batangas citrus, fruits, native root tubers and ginger.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CALL TO ACTION BANNER */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ 
            backgroundColor: '#F3EFE7', 
            borderRadius: '16px', 
            border: '1.5px solid #DECDBD',
            padding: '2.5rem 3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: '0 4px 20px rgba(12, 60, 44, 0.04)'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.65rem', 
                color: '#0C3C2C', 
                fontWeight: 900, 
                marginBottom: '0.35rem',
                letterSpacing: '-0.015em'
              }}>
                Better together, from farm to market.
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#574A46', margin: 0 }}>
                Discover local harvests and start a direct conversation with the people who grow them.
              </p>
            </div>
            <button 
              type="button"
              onClick={() => onNavigate('/marketplace')}
              style={{ 
                backgroundColor: '#D48216', 
                color: '#FFFFFF', 
                border: 'none', 
                borderRadius: '8px', 
                padding: '13px 28px', 
                fontWeight: 800, 
                fontSize: '0.95rem', 
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                boxShadow: '0 4px 14px rgba(212, 130, 22, 0.3)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#BA6F0F'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#D48216'; }}
            >
              Browse Crops
            </button>
          </div>
        </section>

        {/* 8. PURPOSE & DEVELOPER CREDITS */}
        <section style={{ textAlign: 'center', padding: '1rem 0 2rem 0' }}>
          <div style={{ 
            display: 'inline-block',
            backgroundColor: '#FFFFFF',
            border: '1px solid #DECDBD',
            borderRadius: '12px',
            padding: '1.25rem 2rem',
            boxShadow: '0 2px 10px rgba(12, 60, 44, 0.04)'
          }}>
            <span style={{ 
              fontSize: '0.72rem', 
              fontWeight: 800, 
              color: '#8A7B76', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em',
              display: 'block',
              marginBottom: '0.45rem'
            }}>
              BUILT WITH PURPOSE BY
            </span>
            <div style={{ 
              fontSize: '0.95rem', 
              fontWeight: 700, 
              color: '#0C3C2C', 
              letterSpacing: '0.02em',
              marginBottom: '0.25rem'
            }}>
              Calingag &bull; Carmona &bull; Dumagay &bull; Regnanis &bull; Rodriguez &bull; Viray
            </div>
            <span style={{ fontSize: '0.78rem', color: '#1B7A43', fontWeight: 600 }}>
              Pananim &mdash; Connecting the people who feed us.
            </span>
          </div>
        </section>
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
