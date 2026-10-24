import React, { useState } from 'react';
import { Farm } from '../types';
import { mockFarmerSettlements, FarmerSettlement } from '../data/mockData';
import { 
  DollarSign, 
  ArrowUpRight, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Download, 
  AlertCircle, 
  ShieldCheck, 
  HelpCircle,
  FileText,
  Landmark,
  Building,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface FarmerSettlementsPageProps {
  farmer: Farm;
  onNavigate: (route: string) => void;
}

export const FarmerSettlementsPage: React.FC<FarmerSettlementsPageProps> = ({
  farmer,
  onNavigate
}) => {
  const [settlements, setSettlements] = useState<FarmerSettlement[]>(mockFarmerSettlements);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('42850');
  const [withdrawalDestination, setWithdrawalDestination] = useState('BDO Unibank •••• 9102');
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawalAmount) || 0;
    if (amountNum <= 0) return;

    const newRecord: FarmerSettlement = {
      id: `STL-2026-${Math.floor(100 + Math.random() * 900)}`,
      payoutReference: `PAYOUT-REQ-${Date.now().toString().slice(-6)}`,
      date: 'Today, 24 Oct 2026',
      grossAmount: amountNum,
      platformFee: 0,
      netPayout: amountNum,
      payoutDestination: withdrawalDestination,
      status: 'Processing',
      sourceOrders: ['Requested Balance Withdrawal']
    };

    setSettlements([newRecord, ...settlements]);
    setWithdrawalSuccess(true);
    setTimeout(() => {
      setWithdrawalSuccess(false);
      setWithdrawalModalOpen(false);
    }, 2000);
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Top Banner */}
      <section className="hero-banner" style={{ padding: '3.5rem 0 4rem 0' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              FARMER WORKSPACE &bull; EARNINGS &amp; PAYOUTS
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              Farmer Earnings &amp; Settlements
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1rem', marginBottom: 0 }}>
              Transparent ledger of all wholesale harvest payments, escrow release schedules, and direct Philippine bank payouts for {farmer.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Financial Summary Cards */}
      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {/* Available for Withdrawal */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '2px solid #0C3C2C', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>Available for Payout</span>
              <span className="badge badge-green">Ready to withdraw</span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0C3C2C', margin: '0.5rem 0 0.25rem 0' }}>
              ₱42,850.00
            </div>
            <p style={{ fontSize: '0.8rem', color: '#574A46', marginBottom: '1.25rem' }}>
              Cleared funds from deliveries inspected and approved by buyers.
            </p>
            <button
              onClick={() => setWithdrawalModalOpen(true)}
              className="btn btn-accent btn-sm"
              style={{ width: '100%', fontWeight: 700 }}
            >
              Withdraw to Bank &rarr;
            </button>
          </div>

          {/* Pending Escrow */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #EADECF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>In Protected Escrow</span>
              <span className="badge badge-gold">24h Inspection</span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#D48216', margin: '0.5rem 0 0.25rem 0' }}>
              ₱18,200.00
            </div>
            <p style={{ fontSize: '0.8rem', color: '#574A46', marginBottom: '1rem' }}>
              Held safely in Pananim Agri-Escrow while buyers complete quality and weight scale intake checks.
            </p>
            <span style={{ fontSize: '0.75rem', color: '#8A7B76', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={13} /> Scheduled release: Tomorrow, 12:00 PM
            </span>
          </div>

          {/* Lifetime Platform Sales */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #EADECF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8A7B76', textTransform: 'uppercase' }}>Lifetime Payouts Settled</span>
              <span className="badge badge-green">100% Guaranteed</span>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0C3C2C', margin: '0.5rem 0 0.25rem 0' }}>
              ₱186,450.00
            </div>
            <p style={{ fontSize: '0.8rem', color: '#574A46', marginBottom: '1rem' }}>
              Total net revenue transferred directly to {farmer.farmerName} since registration.
            </p>
            <span style={{ fontSize: '0.75rem', color: '#1B7A43', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={13} /> Zero lost payments or default risk
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
          
          {/* Left / Main Column: Settlements Ledger Table */}
          <div style={{ gridColumn: 'span 2' }}>
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', color: '#0C3C2C' }}>Payout &amp; Settlement History</h3>
                  <p style={{ fontSize: '0.85rem', color: '#574A46' }}>
                    Complete audit trail of disbursements sent to your registered Philippine bank accounts.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => onNavigate('/farmer/orders')}
                    className="btn btn-outline-warm btn-sm"
                  >
                    View Sales Orders &rarr;
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Settlement ID</th>
                      <th>Date</th>
                      <th>Gross Sales</th>
                      <th>Platform Fee</th>
                      <th>Net Payout</th>
                      <th>Destination</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settlements.map((stl) => (
                      <tr key={stl.id}>
                        <td>
                          <strong style={{ color: '#0C3C2C' }}>{stl.id}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#8A7B76' }}>{stl.payoutReference}</div>
                        </td>
                        <td>{stl.date}</td>
                        <td>₱{stl.grossAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                        <td style={{ color: '#9B3C1B' }}>
                          {stl.platformFee > 0 ? `-₱${stl.platformFee.toFixed(2)}` : '₱0.00'}
                        </td>
                        <td>
                          <strong style={{ color: '#0C3C2C' }}>
                            ₱{stl.netPayout.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                          </strong>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: '#574A46' }}>
                          {stl.payoutDestination}
                        </td>
                        <td>
                          <span className={`badge ${stl.status === 'Paid' ? 'badge-green' : 'badge-gold'}`}>
                            {stl.status === 'Paid' ? <CheckCircle size={11} /> : <Clock size={11} />} {stl.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#8A7B76', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <HelpCircle size={14} /> Note: Pananim charges a standard 3% wholesale facilitation fee. No hidden monthly subscription or merchant listing charges.
              </div>
            </div>
          </div>

          {/* Right Column: Registered Payout Accounts & Settings */}
          <div>
            <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#0C3C2C' }}>Linked Payout Accounts</h3>
                <span className="badge badge-green">Verified</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Account 1 */}
                <div style={{ border: '1px solid #DECDBD', borderRadius: '10px', padding: '1rem', backgroundColor: '#FAF6F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                    <Landmark size={20} color="#0C3C2C" />
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>BDO Unibank</strong>
                      <span className="badge badge-green" style={{ marginLeft: '0.5rem', fontSize: '0.625rem' }}>Primary</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#574A46', marginLeft: '1.9rem' }}>
                    Account: <strong>•••• •••• 9102</strong><br />
                    Account Name: Ramon Santos
                  </div>
                </div>

                {/* Account 2 */}
                <div style={{ border: '1px solid #EADECF', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                    <Building size={20} color="#1B7A43" />
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: '#0C3C2C' }}>LandBank of the Philippines</strong>
                      <span style={{ fontSize: '0.7rem', color: '#8A7B76', marginLeft: '0.5rem' }}>Agri-Credit Linked</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#574A46', marginLeft: '1.9rem' }}>
                    Account: <strong>•••• •••• 4421</strong><br />
                    Account Name: Ramon Santos (Santos Agri-Farms)
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F5EDE2' }}>
                <p style={{ fontSize: '0.8rem', color: '#8A7B76', marginBottom: '0.75rem' }}>
                  Need to change your payout account or link an agricultural cooperative joint account?
                </p>
                <button 
                  onClick={() => onNavigate('/contact')}
                  className="btn btn-outline-warm btn-sm"
                  style={{ width: '100%' }}
                >
                  Manage Banking Settings
                </button>
              </div>
            </div>

            {/* Escrow Protection Explanation */}
            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#07271C', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <ShieldCheck size={20} color="#92DEB9" />
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', margin: 0 }}>Pananim Agri-Escrow Guarantee</h4>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#E2ECE5', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Buyers deposit 100% of the harvest price before crops leave your farm gate. Once cargo arrives and scale weight is signed, funds release immediately.
              </p>
              <span style={{ fontSize: '0.75rem', color: '#D48216', fontWeight: 600 }}>
                ✓ Zero bounced checks &bull; Zero middleman defaults
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {withdrawalModalOpen && (
        <div className="modal-overlay" onClick={() => setWithdrawalModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
              Request Bank Payout
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#574A46', marginBottom: '1.5rem' }}>
              Funds will be disbursed via PESONet / InstaPay into your verified Philippine bank account within 2 hours.
            </p>

            {withdrawalSuccess ? (
              <div style={{ backgroundColor: '#E8F5EE', padding: '1.5rem', borderRadius: '10px', textAlign: 'center', color: '#1B7A43' }}>
                <CheckCircle size={36} style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ color: '#1B7A43', marginBottom: '0.25rem' }}>Payout Request Submitted!</h4>
                <p style={{ fontSize: '0.85rem', color: '#2A6348' }}>
                  ₱{parseFloat(withdrawalAmount).toLocaleString('en-PH')} is being transferred to {withdrawalDestination}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestPayout} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Payout Amount (Available: ₱42,850.00)
                  </label>
                  <input
                    type="number"
                    max={42850}
                    min={500}
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    required
                    style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0C3C2C' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#574A46', display: 'block', marginBottom: '0.35rem' }}>
                    Destination Bank Account
                  </label>
                  <select 
                    value={withdrawalDestination}
                    onChange={(e) => setWithdrawalDestination(e.target.value)}
                  >
                    <option value="BDO Unibank •••• 9102">BDO Unibank •••• 9102 (Ramon Santos)</option>
                    <option value="LandBank Agri Account •••• 4421">LandBank Agri Account •••• 4421 (Santos Agri-Farms)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setWithdrawalModalOpen(false)}
                    className="btn btn-outline-warm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-accent"
                    style={{ fontWeight: 700 }}
                  >
                    Confirm Payout &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
