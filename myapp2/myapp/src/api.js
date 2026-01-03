// API base configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

// Fetch all slots
export const fetchSlots = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/slots/all`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch slots');
        }

        const data = await response.json();
        return data.slots;
    } catch (error) {
        console.error('Error fetching slots:', error);
        throw error;
    }
};

// Create a booking
export const createBooking = async (bookingData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/create`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create booking');
        }

        return data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

// Get user's bookings
export const getMyBookings = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log('Fetching bookings with token:', token ? 'Token exists' : 'No token');

        const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
            headers: getAuthHeaders()
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            console.error('API Error:', errorData);
            throw new Error(errorData.message || 'Failed to fetch bookings');
        }

        const data = await response.json();
        console.log('Bookings data received:', data);
        return data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

// ============ ADMIN API FUNCTIONS ============

// Get all users (admin only)
export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Create a new slot (admin only)
export const createSlot = async (slotData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/create-slot`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(slotData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create slot');
        }

        return data;
    } catch (error) {
        console.error('Error creating slot:', error);
        throw error;
    }
};

// Update a slot (admin only)
export const updateSlot = async (slotId, slotData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/slot/${slotId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(slotData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update slot');
        }

        return data;
    } catch (error) {
        console.error('Error updating slot:', error);
        throw error;
    }
};

// Delete a slot (admin only)
export const deleteSlot = async (slotId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/slot/${slotId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete slot');
        }

        return data;
    } catch (error) {
        console.error('Error deleting slot:', error);
        throw error;
    }
};

// Get all bookings (admin only)
export const getAllBookings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/all`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch all bookings');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        throw error;
    }
};

// Get analytics (admin only)
export const getAnalytics = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to fetch analytics');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
    }
};

// ============ PARKING TIMER API FUNCTIONS ============

// Check in to a booking (record entry time)
export const checkInBooking = async (bookingId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/check-in`, {
            method: 'POST',
            headers: getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to check in');
        }

        return data;
    } catch (error) {
        console.error('Error checking in:', error);
        throw error;
    }
};

// Check out from a booking (record exit time and calculate fee)
export const checkOutBooking = async (bookingId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/check-out`, {
            method: 'POST',
            headers: getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to check out');
        }

        return data;
    } catch (error) {
        console.error('Error checking out:', error);
        throw error;
    }
};

// Process payment for a booking
export const processPayment = async (bookingId, paymentMethod = 'upi') => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/process-payment`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ method: paymentMethod })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Payment processing failed');
        }

        return data;
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};

// Get fee details for a booking
export const getFeeDetails = async (bookingId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/fee-details`, {
            headers: getAuthHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch fee details');
        }

        return data;
    } catch (error) {
        console.error('Error fetching fee details:', error);
        throw error;
    }
};

