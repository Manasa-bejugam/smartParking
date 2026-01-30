import React, { useState, useEffect } from 'react';
import { getSlotAlerts, getAreaAlerts } from '../api';
import './AvailableSlotsGrid.css';

const AvailableSlotsGrid = ({ slots, alerts }) => {
    // Derived alerts map for slots
    const slotAlerts = React.useMemo(() => {
        const alertsMap = {};
        if (!slots || !alerts) return alertsMap;

        slots.forEach(slot => {
            const slotId = slot._id || slot.id;
            const relevantAlerts = alerts.filter(alert => {
                // Alert targets this specific slot
                if (alert.slot && (alert.slot._id === slotId || alert.slot.id === slotId)) return true;
                // Alert targets this area
                if (alert.area && alert.area === slot.area) return true;
                // Alert targets this city
                if (alert.city && alert.city === slot.city) return true;
                return false;
            });

            if (relevantAlerts.length > 0) {
                // Remove duplicates
                alertsMap[slotId] = Array.from(
                    new Map(relevantAlerts.map(a => [a._id || a.id, a])).values()
                );
            }
        });
        return alertsMap;
    }, [slots, alerts]);

    const getAlertSeverity = (alerts) => {
        if (!alerts || alerts.length === 0) return null;
        const severityOrder = { critical: 3, warning: 2, info: 1 };
        const highestSeverity = alerts.reduce((prev, current) => {
            return (severityOrder[current.severity] || 0) > (severityOrder[prev.severity] || 0) ? current : prev;
        });
        return highestSeverity.severity;
    };

    return (
        <div className="available-slots-container">
            <h3 className="section-title">📊 Live Slot Availability</h3>
            <div className="status-legend">
                <div className="legend-item">
                    <span className="dot available"></span>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <span className="dot booked"></span>
                    <span>Booked</span>
                </div>
            </div>

            <div className="visual-grid">
                {slots && slots.map((slot) => {
                    const alerts = slotAlerts[slot._id || slot.id];
                    const severity = getAlertSeverity(alerts);

                    return (
                        <div
                            key={slot._id || slot.id}
                            className={`slot-dot ${slot.isAvailable ? 'available' : 'booked'} ${severity ? `has-alert-${severity}` : ''} ${slot.distance < 500 ? 'closest' : ''}`}
                            title={`Slot ${slot.slotNumber} - ${slot.isAvailable ? 'Available' : 'Booked'}${alerts ? ` - ${alerts.length} Alert(s)` : ''}${slot.distance !== Infinity ? ` - ${Math.round(slot.distance)}m away` : ''}`}
                        >
                            {slot.slotNumber}
                            {alerts && alerts.length > 0 && (
                                <span className="alert-indicator">⚠️</span>
                            )}
                            {slot.distance !== Infinity && (
                                <div className={`distance-badge ${slot.distance < 500 ? 'closest-badge' : ''}`}>
                                    {slot.distance > 1000
                                        ? `${(slot.distance / 1000).toFixed(1)}km`
                                        : `${Math.round(slot.distance)}m`}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <p className="hint-text">Click markers on the map for details</p>
        </div>
    );
};

export default AvailableSlotsGrid;
