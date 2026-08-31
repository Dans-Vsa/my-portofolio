import { forwardRef } from 'react';

const SpiralCard = forwardRef(({ children, className = '' }, ref) => (
  <div
    ref={ref}
    className={`absolute inset-0 bg-bg-secondary border border-border rounded-card overflow-y-auto ${className}`}
    style={{ willChange: 'transform, opacity' }}
  >
    {children}
  </div>
));

SpiralCard.displayName = 'SpiralCard';

export default SpiralCard;
