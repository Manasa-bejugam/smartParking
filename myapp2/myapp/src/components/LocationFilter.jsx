import React from 'react';
import './LocationFilter.css';

const LocationFilter = ({ slots, selectedLocation, onLocationChange }) => {
    // Group slots by location (address)
    const locationGroups = {};

    slots && Array.isArray(slots) && slots.forEach(slot => {
        const key = slot.address || 'Unknown Location';
        if (!locationGroups[key]) {
            locationGroups[key] = {
                address: slot.address || 'Unknown Location',
                city: slot.city || 'Hyderabad',
                area: slot.area || 'General',
                placeType: slot.placeType || 'Parking',
                slots: []
            };
        }
        locationGroups[key].slots.push(slot);
    });

    // Get unique locations
    const locations = Object.values(locationGroups);

    // Group by city
    const cities = [...new Set(locations.map(l => l.city))].sort();

    return (
        <div className="location-filter">
            <div className="filter-header">
                <span className="filter-icon">📍</span>
                <span className="filter-label">Select Parking Location:</span>
            </div>
            <select
                className="location-select"
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
            >
                <option value="">-- Choose a location to see available slots --</option>
                {cities.map(city => (
                    <optgroup key={city} label={city}>
                        {locations
                            .filter(loc => loc.city === city)
                            .map(loc => (
                                <option key={loc.address} value={loc.address}>
                                    {loc.address} ({loc.placeType}) - {loc.slots.length} slots
                                </option>
                            ))
                        }
                    </optgroup>
                ))}
            </select>
        </div>
    );
};

export default LocationFilter;
