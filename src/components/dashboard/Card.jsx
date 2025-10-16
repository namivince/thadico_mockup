import React from 'react';
import './Card.css';

const Card = ({ children, title, subtitle, actions, className = '' }) => {
  return (
    <div className={`dashboard-card ${className}`}>
      {(title || subtitle || actions) && (
        <div className="dashboard-card-header">
          <div className="dashboard-card-title-section">
            {title && <h3 className="dashboard-card-title">{title}</h3>}
            {subtitle && <p className="dashboard-card-subtitle">{subtitle}</p>}
          </div>
          {actions && (
            <div className="dashboard-card-actions">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className="dashboard-card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
