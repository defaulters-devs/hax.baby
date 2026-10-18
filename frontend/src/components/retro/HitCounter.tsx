import React from 'react';
import './HitCounter.css';

interface HitCounterProps {
  count: number;
  label?: string;
}

export const HitCounter: React.FC<HitCounterProps> = ({ 
  count, 
  label = "Maybes Caught Worldwide" 
}) => {
  // Format to 6 digits, e.g. 001482
  const formattedCount = String(count).padStart(6, '0');

  return (
    <div className="hit-counter-wrapper" title={`${count.toLocaleString()} Maybes converted to starlight`}>
      <div className="hit-counter-frame">
        <span className="hit-counter-icon">✦</span>
        <div className="hit-counter-digits">
          {formattedCount.split('').map((digit, i) => (
            <div key={i} className="odometer-slot">
              <span className="odometer-digit">{digit}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hit-counter-label">
        <span className="odometer-live-dot" />
        {label}
      </div>
    </div>
  );
};
