// Admin Dashboard Specific Functionality

// Fetch and display all users
async function loadUsers() {
    const token = checkAuth();
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/api/admin/users`, {
            headers: {
                'x-auth-token': token
            }
        });

        const users = await response.json();
        const usersTable = document.getElementById('usersTable');

        if (users && users.length > 0) {
            // Update total users count
            document.getElementById('totalUsers').textContent = users.length;

            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Vehicle Number</th>
                            <th>Vehicle Type</th>
                            <th>Phone</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            users.forEach(user => {
                tableHTML += `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.vehicleNumber}</td>
                        <td>${user.vehicleType}</td>
                        <td>${user.phone}</td>
                        <td>${user.role}</td>
                    </tr>
                `;
            });

            tableHTML += `
                    </tbody>
                </table>
            `;

            usersTable.innerHTML = tableHTML;
        } else {
            usersTable.innerHTML = '<p>No users found</p>';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('usersTable').innerHTML = '<p>Error loading users. Make sure you are logged in as admin.</p>';
    }
}

// Fetch and display parking slots with statistics
async function loadAdminSlots() {
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
            // Update statistics
            const totalSlots = data.slots.length;
            const availableSlots = data.slots.filter(slot => slot.isAvailable).length;

            document.getElementById('totalSlots').textContent = totalSlots;
            document.getElementById('availableSlots').textContent = availableSlots;

            // Display slots
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

// Initialize admin dashboard
window.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadAdminSlots();
});
