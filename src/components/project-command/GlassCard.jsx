import React from 'react';

const GlassCard = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  glowColor = '#22D3EE',
  ...props 
}) => {
  return (
    <div 
      className={className}
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(34, 211, 238, 0.3)',
        borderRadius: '8px',
        padding: '16px',
        transition: 'all 0.3s ease',
        boxShadow: `0 0 15px ${glowColor}20, inset 0 1px 0 rgba(34, 211, 238, 0.1)`,
        ...props.style
      }}
      {...props}
    >
      {(title || subtitle) && (
        <div style={{ marginBottom: '12px' }}>
          {title && (
            <h3 style={{
              color: '#22D3EE',
              fontWeight: '600',
              fontSize: '14px',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: 0
            }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p style={{
              color: '#94A3B8',
              fontSize: '12px',
              margin: 0
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default GlassCard;
