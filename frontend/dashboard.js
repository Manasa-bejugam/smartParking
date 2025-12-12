const API_URL = 'http://localhost:5000';

// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return null;
    }
    return token;
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// Fetch user profile
async function getUserProfile() {
    const token = checkAuth();
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
            headers: {
                'x-auth-token': token
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            logout();
            return null;
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}

// Initialize dashboard on page load
window.addEventListener('DOMContentLoaded', async () => {
    const user = await getUserProfile();
    if (user && document.getElementById('userName')) {
        document.getElementById('userName').textContent = user.name;
    }
});
