import React from 'react';

export default function ListingCard({ listing }) {
  const swatchClasses = {
    metal: 'swatch-metal',
    timber: 'swatch-timber',
    polymer: 'swatch-polymer',
    textile: 'swatch-textile',
    mineral: 'swatch-mineral',
    fiber: 'swatch-fiber',
  };

  const currentSwatch = swatchClasses[listing.category?.toLowerCase()] || 'swatch-metal';

  return (
    <div className="bg-paper rounded-sm overflow-hidden border border-ink/10 hover:-translate-y-1 transition-transform duration-200">
      <div className={`h-36 ${currentSwatch}`} />
      
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-600 text-lg text-ink tracking-tight">
            {listing.title || 'Untitled Material'}
          </h3>
          <span className="stamp w-9 h-9 flex items-center justify-center font-mono text-[9px] rotate-[-8deg] shrink-0 ml-2 text-stone">
            OK
          </span>
        </div>
        
        <p className="font-mono text-xs text-stone mt-2">
          {listing.spec || 'Standard Spec'} · {listing.supplierName || 'Verified Supplier'}
        </p>
        
        <div className="flex items-center justify-between mt-5 text-sm">
          <span className="text-ink/60">{listing.location || 'Baku, AZ'}</span>
          <span className="font-mono font-semibold text-ink">
            ${listing.price || '0.00'} / {listing.unit || 'kg'}
          </span>
        </div>
      </div>
    </div>
  );
}