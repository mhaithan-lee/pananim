import React, { useState } from 'react';
import { CropListing } from '../../types';
import { 
  X, 
  Check, 
  Plus, 
  Minus, 
  Equal, 
  Info, 
  CheckCircle2, 
  MapPin, 
  Sparkles 
} from 'lucide-react';

interface FarmerUpdateStockModalProps {
  crops: CropListing[];
  initialCropId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveStock: (cropId: string, newStock: number) => void;
}

export const FarmerUpdateStockModal: React.FC<FarmerUpdateStockModalProps> = ({
  crops,
  initialCropId,
  isOpen,
  onClose,
  onSaveStock
}) => {
  if (!isOpen) return null;

  const [selectedCropId, setSelectedCropId] = useState<string>(initialCropId || crops[0]?.id || '');
  const [adjustmentMode, setAdjustmentMode] = useState<'add' | 'remove' | 'set'>('remove');
  const [amount, setAmount] = useState<number>(200);
  const [reason, setReason] = useState('Sold outside Pananim');
  const [notes, setNotes] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const selectedCrop = crops.find(c => c.id === selectedCropId) || crops[0];

  if (!selectedCrop) return null;

  const currentStock = selectedCrop.availableStock;
  let newStock = currentStock;

  if (adjustmentMode === 'add') {
    newStock = currentStock + amount;
  } else if (adjustmentMode === 'remove') {
    newStock = Math.max(0, currentStock - amount);
  } else {
    newStock = Math.max(0, amount);
  }

  const handleSave = () => {
    onSaveStock(selectedCrop.id, newStock);
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 39, 28, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FAF7F2',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          border: '1px solid #EBE4DA'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #EBE4DA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D48216', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INVENTORY MANAGEMENT
            </div>
            <h2 style={{ fontSize: '1.65rem', color: '#0C3C2C', margin: '0.2rem 0' }}>Update Crop Stock</h2>
            <p style={{ fontSize: '0.875rem', color: '#574A46', margin: 0 }}>
              Keep available harvest accurate so buyers know what is ready to order.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #E5DFD5',
              background: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#574A46'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: 2 Columns matching Update Stock · Pananim.png */}
        <div style={{ padding: '2rem' }}>
          {successToast ? (
            <div
              style={{
                backgroundColor: '#E8F5EE',
                border: '1px solid #C4E3D2',
                borderRadius: '16px',
                padding: '3rem 2rem',
                textAlign: 'center',
                color: '#1B7A43'
              }}
            >
              <CheckCircle2 size={48} style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#0C3C2C', marginBottom: '0.5rem' }}>
                Inventory Successfully Updated!
              </h3>
              <p style={{ color: '#16533F' }}>
                New stock for <strong>{selectedCrop.name}</strong> is now <strong>{newStock.toLocaleString()} kg</strong>.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '2rem',
                alignItems: 'start'
              }}
            >
              {/* Left Column: Form & Selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Select your crop card */}
                <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EBE4DA', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#0C3C2C', margin: 0 }}>Select your crop</h3>
                    <span style={{ fontSize: '0.75rem', color: '#8A7B76' }}>{crops.length} active listings</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    {crops.slice(0, 4).map((crop) => {
                      const isSelected = crop.id === selectedCropId;
                      return (
                        <div
                          key={crop.id}
                          onClick={() => setSelectedCropId(crop.id)}
                          style={{
                            padding: '0.85rem',
                            borderRadius: '12px',
                            border: `2px solid ${isSelected ? '#0C3C2C' : '#EBE4DA'}`,
                            backgroundColor: isSelected ? '#F2F7F4' : '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            position: 'relative'
                          }}
                        >
                          <img
                            src={crop.imageUrl}
                            alt={crop.name}
                            style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0C3C2C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {crop.name}
                            </div>
                            <div style={{ fontSize: '0.725rem', color: '#574A46' }}>
                              {crop.availableStock.toLocaleString()} kg • ₱{crop.pricePerUnit}/kg
                            </div>
                          </div>
                          {isSelected && (
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: '#0C3C2C',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Adjust available stock card */}
                <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EBE4DA', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#0C3C2C', marginBottom: '0.25rem', marginTop: 0 }}>Adjust available stock</h3>
                  <p style={{ fontSize: '0.825rem', color: '#574A46', marginBottom: '1.25rem' }}>
                    Record a change or set the exact quantity on hand.
                  </p>

                  {/* Mode Tabs */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <button
                      type="button"
                      onClick={() => setAdjustmentMode('add')}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${adjustmentMode === 'add' ? '#0C3C2C' : '#D5CABE'}`,
                        backgroundColor: adjustmentMode === 'add' ? '#E8F5EE' : '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: adjustmentMode === 'add' ? '#0C3C2C' : '#574A46',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Plus size={14} /> Add stock
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdjustmentMode('remove')}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${adjustmentMode === 'remove' ? '#0C3C2C' : '#D5CABE'}`,
                        backgroundColor: adjustmentMode === 'remove' ? '#E8F5EE' : '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: adjustmentMode === 'remove' ? '#0C3C2C' : '#574A46',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Minus size={14} /> Remove stock
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdjustmentMode('set')}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${adjustmentMode === 'set' ? '#0C3C2C' : '#D5CABE'}`,
                        backgroundColor: adjustmentMode === 'set' ? '#E8F5EE' : '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: adjustmentMode === 'set' ? '#0C3C2C' : '#574A46',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Equal size={14} /> Set total stock
                    </button>
                  </div>

                  {/* Quantity Stepper & Reason */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#221714', marginBottom: '0.4rem' }}>
                        Quantity to {adjustmentMode === 'set' ? 'set' : adjustmentMode} *
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #D5CABE',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setAmount(Math.max(1, amount - 50))}
                          style={{
                            padding: '0.75rem 1rem',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: '#574A46'
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            border: 'none',
                            outline: 'none',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            color: '#0C3C2C'
                          }}
                        />
                        <span style={{ fontSize: '0.85rem', color: '#574A46', paddingRight: '0.5rem' }}>kg</span>
                        <button
                          type="button"
                          onClick={() => setAmount(amount + 50)}
                          style={{
                            padding: '0.75rem 1rem',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: '#574A46'
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#221714', marginBottom: '0.4rem' }}>
                        Reason for update *
                      </label>
                      <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        style={{
                          width: '100%',
                          height: '46px',
                          border: '1px solid #D5CABE',
                          borderRadius: '10px',
                          padding: '0 12px',
                          backgroundColor: '#FFFFFF',
                          color: '#1D2D24',
                          outline: 'none'
                        }}
                      >
                        <option value="Sold outside Pananim">Sold outside Pananim</option>
                        <option value="New harvest consolidated">New harvest consolidated</option>
                        <option value="Damaged or spoiled produce">Damaged or spoiled produce</option>
                        <option value="Inventory audit adjustment">Inventory audit adjustment</option>
                      </select>
                    </div>
                  </div>

                  {/* Note input */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#221714', marginBottom: '0.4rem' }}>
                      Note (optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add an internal farm audit note..."
                      style={{
                        width: '100%',
                        height: '44px',
                        border: '1px solid #D5CABE',
                        borderRadius: '10px',
                        padding: '0 14px',
                        backgroundColor: '#FFFFFF',
                        color: '#1D2D24',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Live Banner Notice */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#E8F5EE',
                      border: '1px solid #C4E3D2',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      fontSize: '0.825rem',
                      color: '#16533F'
                    }}
                  >
                    <CheckCircle2 size={18} color="#1B7A43" style={{ flexShrink: 0 }} />
                    <div>
                      <strong>{newStock.toLocaleString()} kg</strong> will remain available in the marketplace. Listing will stay live.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Current Inventory & Update Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Current Inventory Card */}
                <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EBE4DA', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.05rem', color: '#0C3C2C', margin: 0 }}>Current inventory</h3>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1B7A43', backgroundColor: '#E8F5EE', padding: '2px 8px', borderRadius: '9999px' }}>
                      ● Live
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.4rem', color: '#0C3C2C', marginBottom: '0.25rem', marginTop: 0 }}>{selectedCrop.name}</h2>
                  <div style={{ fontSize: '0.8rem', color: '#574A46', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    <MapPin size={14} color="#D48216" /> {selectedCrop.municipality}, {selectedCrop.province}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem 0', borderTop: '1px solid #EBE4DA', borderBottom: '1px solid #EBE4DA' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase' }}>Available stock</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0C3C2C' }}>
                        {selectedCrop.availableStock.toLocaleString()} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>kg</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#8A7B76', textTransform: 'uppercase' }}>Selling price</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0C3C2C' }}>
                        ₱{selectedCrop.pricePerUnit} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>/ kg</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8A7B76' }}>Harvested</span>
                      <span style={{ fontWeight: 600 }}>{selectedCrop.harvestDate || '22 Oct 2026'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8A7B76' }}>Available from</span>
                      <span style={{ fontWeight: 600 }}>{selectedCrop.availableFrom || '23 Oct 2026'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8A7B76' }}>Availability</span>
                      <span style={{ fontWeight: 600, color: '#1B7A43' }}>Ready for pickup</span>
                    </div>
                  </div>
                </div>

                {/* Update Summary Card */}
                <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EBE4DA', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.05rem', color: '#0C3C2C', margin: 0 }}>Update summary</h3>
                    <span style={{ fontSize: '0.75rem', color: '#BA4B24', fontWeight: 600 }}>Pending save</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#574A46' }}>Current stock</span>
                    <span style={{ fontWeight: 700 }}>{currentStock.toLocaleString()} kg</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#574A46' }}>Stock change ({adjustmentMode})</span>
                    <span style={{ fontWeight: 700, color: adjustmentMode === 'remove' ? '#C53030' : '#1B7A43' }}>
                      {adjustmentMode === 'remove' ? `-${amount.toLocaleString()} kg` : `+${amount.toLocaleString()} kg`}
                    </span>
                  </div>

                  {/* Highlighted New Available Stock Box */}
                  <div
                    style={{
                      backgroundColor: '#E8F5EE',
                      border: '1px solid #C4E3D2',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      textAlign: 'center',
                      marginBottom: '1rem'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16533F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      NEW AVAILABLE STOCK
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0C3C2C', margin: '0.25rem 0' }}>
                      {newStock.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 600 }}>kg</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#16533F' }}>
                      Selling price stays at ₱{selectedCrop.pricePerUnit}/kg
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#8A7B76' }}>
                    <Info size={14} style={{ flexShrink: 0 }} />
                    <span>Buyer-facing quantity updates immediately across all regional search results.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        {!successToast && (
          <div
            style={{
              padding: '1.25rem 2rem',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #EBE4DA',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px'
            }}
          >
            <span style={{ fontSize: '0.8rem', color: '#8A7B76' }}>
              Changes apply immediately to live marketplace records.
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '9px 18px',
                  borderRadius: '10px',
                  border: '1px solid #D5CABE',
                  backgroundColor: '#FFFFFF',
                  color: '#574A46',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                style={{
                  padding: '9px 22px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#D48216',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(212, 130, 22, 0.35)'
                }}
              >
                Save stock update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
