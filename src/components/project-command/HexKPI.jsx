import React from 'react';

const HexKPI = ({ value, label, color = '#22D3EE', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-20 h-20 text-lg',
    md: 'w-24 h-24 text-xl',
    lg: 'w-32 h-32 text-2xl'
  };

  const hexPath = "M50 5 L85 25 L85 65 L50 85 L15 65 L15 25 Z";

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg viewBox="0 0 100 90" className="w-full h-full">
          {/* Background hex */}
          <path
            d={hexPath}
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Glowing hex border */}
          <path
            d={hexPath}
            fill="none"
            stroke={color}
            strokeWidth="2"
            style={{
              filter: `drop-shadow(0 0 8px ${color}66)`
            }}
          />
          {/* Inner glow */}
          <path
            d="M50 15 L75 30 L75 60 L50 75 L25 60 L25 30 Z"
            fill={`${color}15`}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`font-bold text-slate-100 ${sizeClasses[size].split(' ')[2]}`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-slate-400 text-center font-medium">
        {label}
      </div>
    </div>
  );
};

export default HexKPI;
