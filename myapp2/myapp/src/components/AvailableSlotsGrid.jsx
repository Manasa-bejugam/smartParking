import React from 'react';
import './AvailableSlotsGrid.css';

const AvailableSlotsGrid = ({ slots }) => {
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
                {slots && slots.map((slot) => (
                    <div
                        key={slot._id || slot.id}
                        className={`slot-dot ${slot.isAvailable ? 'available' : 'booked'}`}
                        title={`Slot ${slot.slotNumber} - ${slot.isAvailable ? 'Available' : 'Booked'}`}
                    >
                        {slot.slotNumber}
                    </div>
                ))}
            </div>

            <p className="hint-text">Click markers on the map for details</p>
        </div>
    );
};

export default AvailableSlotsGrid;
