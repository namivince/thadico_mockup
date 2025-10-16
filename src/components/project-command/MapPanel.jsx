import React from 'react';

const MapPanel = ({ pipelineGroups = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22D3EE';
      case 'completed': return '#34D399';
      case 'pending': return '#F59E0B';
      default: return '#60A5FA';
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Map Area */}
      <div className="map-container" style={{ 
        flex: 1, 
        position: 'relative'
      }}>
        {/* Grid background - denser như trong ảnh */}
        <div 
          className="grid-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.4
          }}
        />
        
        {/* World Map Background - Detailed continents */}
        <svg 
          className="world-continents"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.6,
            pointerEvents: 'none'
          }}
          viewBox="0 0 1000 500"
        >
          {/* North America - Enhanced */}
          <path 
            d="M80 100 L200 80 L250 120 L240 160 L220 200 L180 220 L140 200 L100 180 L80 140 Z" 
            fill="#22D3EE" 
            opacity="0.6"
            stroke="#22D3EE"
            strokeWidth="1"
          />
          {/* South America - Enhanced */}
          <path 
            d="M140 240 L180 220 L200 240 L210 280 L200 340 L180 360 L160 350 L140 320 L130 280 Z" 
            fill="#34D399" 
            opacity="0.5"
            stroke="#34D399"
            strokeWidth="1"
          />
          {/* Europe - Enhanced */}
          <path 
            d="M380 80 L460 70 L500 100 L490 140 L470 160 L440 150 L400 130 Z" 
            fill="#8B5CF6" 
            opacity="0.6"
            stroke="#8B5CF6"
            strokeWidth="1"
          />
          {/* Africa - Enhanced */}
          <path 
            d="M400 180 L480 160 L500 200 L490 260 L480 320 L460 340 L420 330 L400 280 L390 220 Z" 
            fill="#F59E0B" 
            opacity="0.5"
            stroke="#F59E0B"
            strokeWidth="1"
          />
          {/* Asia - Enhanced */}
          <path 
            d="M520 60 L680 50 L750 100 L740 140 L720 180 L680 220 L640 200 L580 180 L540 140 Z" 
            fill="#EF4444" 
            opacity="0.5"
            stroke="#EF4444"
            strokeWidth="1"
          />
          {/* Australia - Enhanced */}
          <path 
            d="M640 300 L740 290 L760 320 L750 350 L720 360 L680 350 L650 330 Z" 
            fill="#22D3EE" 
            opacity="0.5"
            stroke="#22D3EE"
            strokeWidth="1"
          />
          
          {/* Connection lines between continents */}
          <path 
            d="M200 160 Q300 140 400 120" 
            stroke="#22D3EE" 
            strokeWidth="1" 
            fill="none" 
            opacity="0.2"
            strokeDasharray="5,5"
          />
          <path 
            d="M460 140 Q520 130 550 140" 
            stroke="#22D3EE" 
            strokeWidth="1" 
            fill="none" 
            opacity="0.2"
            strokeDasharray="5,5"
          />
          <path 
            d="M600 180 Q640 220 680 280" 
            stroke="#22D3EE" 
            strokeWidth="1" 
            fill="none" 
            opacity="0.2"
            strokeDasharray="5,5"
          />
        </svg>
        
        {/* Diagonal grid lines */}
        <div 
          className="diagonal-grid"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15
          }}
        />
        
        {/* 3D Tower SVG - Enhanced */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <svg width="200" height="250" viewBox="0 0 200 250" className="tower-3d">
            {/* Platform base */}
            <ellipse
              cx="70"
              cy="160"
              rx="50"
              ry="15"
              fill="url(#platformGradient)"
              stroke="#22D3EE"
              strokeWidth="1"
              opacity="0.8"
            />
            
            {/* Tower base - larger */}
            <polygon
              points="70,150 25,130 25,85 70,65 115,85 115,130"
              fill="url(#towerGradient)"
              stroke="#22D3EE"
              strokeWidth="2"
              filter="url(#glow)"
            />
            {/* Tower middle */}
            <polygon
              points="70,85 35,70 35,40 70,25 105,40 105,70"
              fill="url(#towerGradient2)"
              stroke="#60A5FA"
              strokeWidth="2"
              filter="url(#glow)"
            />
            {/* Tower top */}
            <polygon
              points="70,45 45,35 45,15 70,5 95,15 95,35"
              fill="url(#towerGradient3)"
              stroke="#34D399"
              strokeWidth="2"
              filter="url(#glow)"
            />
            
            {/* Central beam */}
            <line
              x1="70"
              y1="5"
              x2="70"
              y2="160"
              stroke="#22D3EE"
              strokeWidth="1"
              opacity="0.6"
              strokeDasharray="5,5"
            />
            
            {/* Glowing effects */}
            <defs>
              <linearGradient id="platformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE20" />
                <stop offset="100%" stopColor="#0A0F1E" />
              </linearGradient>
              <linearGradient id="towerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE40" />
                <stop offset="50%" stopColor="#22D3EE20" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="towerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA40" />
                <stop offset="50%" stopColor="#60A5FA20" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="towerGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D39940" />
                <stop offset="50%" stopColor="#34D39920" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Ripple Rings Animation - Bigger */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {[1, 2, 3, 4].map((ring) => (
            <div
              key={ring}
              style={{
                position: 'absolute',
                border: '2px solid rgba(34, 211, 238, 0.4)',
                borderRadius: '50%',
                animation: 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite',
                width: `${ring * 120}px`,
                height: `${ring * 120}px`,
                top: `${-ring * 60}px`,
                left: `${-ring * 60}px`,
                animationDelay: `${ring * 0.6}s`,
                boxShadow: `0 0 20px rgba(34, 211, 238, 0.3)`
              }}
            />
          ))}
        </div>

        {/* Scanning beam */}
        <div 
          className="scanning-beam"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '180px',
            background: 'linear-gradient(to top, transparent, #22D3EE, transparent)',
            transform: 'translate(-50%, -50%)'
          }} />

        {/* Info Panel - Top Right */}
        <div className="info-panel" style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '16px 20px',
          borderRadius: '12px'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#22D3EE',
            marginBottom: '6px'
          }}>03</div>
          <div style={{
            fontSize: '14px',
            color: '#22D3EE',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            fontWeight: '600'
          }}>CONTROL</div>
          <div style={{
            fontSize: '11px',
            color: '#94A3B8',
            lineHeight: '1.4'
          }}>
            • All Information<br/>
            • Monitored Information
          </div>
        </div>

        {/* Corner decorations */}
        <div className="corner-decoration" style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          width: '50px',
          height: '50px',
          border: '2px solid rgba(34, 211, 238, 0.5)',
          borderRight: 'none',
          borderBottom: 'none',
          borderRadius: '6px 0 0 0'
        }} />
        
        <div className="corner-decoration" style={{
          position: 'absolute',
          bottom: '15px',
          right: '15px',
          width: '50px',
          height: '50px',
          border: '2px solid rgba(34, 211, 238, 0.5)',
          borderLeft: 'none',
          borderTop: 'none',
          borderRadius: '0 0 6px 0'
        }} />

        {/* Scanning lines */}
        <div className="scan-line-top" style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #22D3EE, transparent)'
        }} />
        
        <div className="scan-line-bottom" style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #22D3EE, transparent)'
        }} />
      </div>

      {/* Pipeline Groups */}
      <div style={{ marginTop: '16px' }}>
        <h4 style={{ 
          color: '#CBD5E1', 
          fontWeight: '500', 
          fontSize: '14px', 
          marginBottom: '12px' 
        }}>Pipeline Groups</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {pipelineGroups.map((group) => (
            <div
              key={group.id}
              className="pipeline-group-item"
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                border: `1px solid ${getStatusColor(group.status)}40`,
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: `${getStatusColor(group.status)}15`,
                color: getStatusColor(group.status),
                boxShadow: `0 0 15px ${getStatusColor(group.status)}20`
              }}
            >
              {group.name} ({group.count})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
