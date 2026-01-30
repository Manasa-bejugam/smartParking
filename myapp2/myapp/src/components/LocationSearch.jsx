import React, { useState, useEffect } from 'react';
import './LocationSearch.css';

const LocationSearch = ({ slots, onSearch, initialValue }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    // Sync internal query with parent state (if provided)
    useEffect(() => {
        if (initialValue !== undefined) {
            setQuery(initialValue);
        }
    }, [initialValue]);

    useEffect(() => {
        // Get unique locations from slots data
        const uniqueLocations = [];
        const seen = new Set();

        slots.forEach(slot => {
            const keys = [
                { type: 'City', value: slot.city },
                { type: 'Area', value: slot.area, city: slot.city },
                // Only include addresses if we are searching (too many for dropdown)
                ...(query ? [{ type: 'Address', value: slot.address, city: slot.city }] : [])
            ];

            keys.forEach(k => {
                if (k.value && !seen.has(`${k.type}:${k.value}`)) {
                    seen.add(`${k.type}:${k.value}`);
                    uniqueLocations.push({
                        label: k.value,
                        type: k.type,
                        city: k.city || '',
                        id: `${k.type}:${k.value}`
                    });
                }
            });
        });

        let filtered = [];
        if (!query) {
            // Show all Cities and Areas when no query
            filtered = uniqueLocations.sort((a, b) => {
                if (a.type === b.type) return a.label.localeCompare(b.label);
                return a.type === 'City' ? -1 : 1; // Cities first
            });
        } else {
            filtered = uniqueLocations.filter(loc =>
                loc.label.toLowerCase().includes(query.toLowerCase()) ||
                loc.city.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 8);
        }

        setResults(filtered);
    }, [query, slots]);

    const handleSelect = (result) => {
        setQuery(result.label);
        onSearch(result);
        setResults([]);
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
        onSearch(null);
    };

    return (
        <div className="location-search-container">
            <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search or select a location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
                {query && (
                    <button className="clear-btn" onClick={handleClear}>✕</button>
                )}
            </div>

            {isFocused && results.length > 0 && (
                <div className="search-results">
                    {results.map(res => (
                        <div
                            key={res.id}
                            className="search-result-item"
                            onClick={() => handleSelect(res)}
                        >
                            <span className="result-icon">
                                {res.type === 'City' ? '🏙️' : res.type === 'Area' ? '🏫' : '📍'}
                            </span>
                            <div className="result-details">
                                <div className="result-label">{res.label}</div>
                                <div className="result-type">
                                    {res.type} {res.city ? `• ${res.city}` : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;
