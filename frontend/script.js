const API_URL = 'http://localhost:5000';

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
   e.preventDefault();

   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const messageDiv = document.getElementById('message');

   try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
         // Store token in localStorage
         localStorage.setItem('token', data.token);
         messageDiv.className = 'success';
         messageDiv.textContent = 'Login successful! Redirecting...';

         // Get user profile to determine role
         const profileResponse = await fetch(`${API_URL}/api/auth/profile`, {
            headers: {
               'x-auth-token': data.token
            }
         });

         const profileData = await profileResponse.json();

         // Redirect based on role
         setTimeout(() => {
            if (profileData.user.role === 'admin') {
               window.location.href = 'admin-dashboard.html';
            } else {
               window.location.href = 'user-dashboard.html';
            }
         }, 1000);
      } else {
         messageDiv.className = 'error';
         messageDiv.textContent = data.message || 'Login failed. Please try again.';
      }
   } catch (error) {
      messageDiv.className = 'error';
      messageDiv.textContent = 'Error connecting to server. Please try again.';
      console.error('Login error:', error);
   }
});

// Registration Form Handler
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
   e.preventDefault();

   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const vehicleNumber = document.getElementById('vehicleNumber').value;
   const vehicleType = document.getElementById('vehicleType').value;
   const phone = document.getElementById('phone').value;
   const role = document.getElementById('role').value;
   const messageDiv = document.getElementById('message');

   try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ name, email, password, vehicleNumber, vehicleType, phone, role })
      });

      const data = await response.json();

      if (response.ok) {
         messageDiv.className = 'success';
         messageDiv.textContent = 'Registration successful! Redirecting to login...';
         setTimeout(() => {
            window.location.href = 'index.html';
         }, 1500);
      } else {
         messageDiv.className = 'error';
         messageDiv.textContent = data.message || 'Registration failed. Please try again.';
      }
   } catch (error) {
      messageDiv.className = 'error';
      messageDiv.textContent = 'Error connecting to server. Please try again.';
      console.error('Registration error:', error);
   }
});
