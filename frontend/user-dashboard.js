// User Dashboard Specific Functionality

// Fetch and display parking slots
async function loadParkingSlots() {
    const token = checkAuth();
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/api/slots/all`, {
            headers: {
                'x-auth-token': token
            }
        });

        const data = await response.json();
        const slotsGrid = document.getElementById('slotsGrid');

        if (data.slots && data.slots.length > 0) {
            slotsGrid.innerHTML = '';
            data.slots.forEach(slot => {
                const slotDiv = document.createElement('div');
                slotDiv.className = `slot ${slot.isAvailable ? 'available' : 'occupied'}`;
                slotDiv.innerHTML = `
                    <div>${slot.slotNumber}</div>
                    <div style="font-size: 12px; margin-top: 5px;">
                        ${slot.isAvailable ? 'Available' : 'Occupied'}
                    </div>
                `;
                slotsGrid.appendChild(slotDiv);
            });
        } else {
            slotsGrid.innerHTML = '<p>No parking slots available</p>';
        }
    } catch (error) {
        console.error('Error loading slots:', error);
        document.getElementById('slotsGrid').innerHTML = '<p>Error loading parking slots</p>';
    }
}

// Load user vehicle information
async function loadVehicleInfo() {
    const user = await getUserProfile();
    if (user) {
        document.getElementById('vehicleNumber').textContent = user.vehicleNumber || 'Not provided';
        document.getElementById('vehicleType').textContent = user.vehicleType || 'Not provided';
    }
}

// Initialize user dashboard
window.addEventListener('DOMContentLoaded', () => {
    loadParkingSlots();
    loadVehicleInfo();
});
