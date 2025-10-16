import React from 'react';

const ScannerRing = ({ title, days, subtitle, totalDays = 1531 }) => {
  const progress = ((totalDays - days) / totalDays) * 100;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 mb-4">
        {/* Background ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#22D3EE"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 8px #22D3EE66)'
            }}
          />
          {/* Animated scanner line */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="url(#scannerGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="10 190"
            className="animate-spin"
            style={{ animationDuration: '3s' }}
          />
          <defs>
            <linearGradient id="scannerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-cyan-400 mb-1">
            {days.toLocaleString()}
          </div>
          <div className="text-sm text-slate-400 text-center">
            {title}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-slate-300 font-medium">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default ScannerRing;
