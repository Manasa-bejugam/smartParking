const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api/auth';
const ADMIN_SECRET = process.env.ADMIN_SECRET || "SmartParkingAdmin2024";
const JWT_SECRET = process.env.JWT_SECRET || "smartparking_jwt_secret";

// Generate Admin Token
const adminInviteToken = jwt.sign({ role: 'admin_invite' }, JWT_SECRET, { expiresIn: '1h' });

async function runTest() {
    try {
        console.log('--- Starting Admin Expiry Test ---');

        console.log('1. Registering Temp Admin...');
        const adminEmail = `tempadmin_${Date.now()}@test.com`;
        const adminPass = 'password123';

        try {
            const registerResponse = await axios.post(`${BASE_URL}/register`, {
                name: 'Temp Admin',
                email: adminEmail,
                password: adminPass,
                phone: '1234567890',
                role: 'admin',
                adminSecret: adminInviteToken
            });
            console.log('[PASS] Admin Registered:', registerResponse.data.message);
        } catch (e) {
            console.error('[FAIL] Admin Registration Failed:', e.response ? JSON.stringify(e.response.data) : e.message);
            return;
        }

        console.log('2. Logging in as Admin (Fresh)...');
        let loginResponse;
        try {
            loginResponse = await axios.post(`${BASE_URL}/login`, {
                email: adminEmail,
                password: adminPass
            });
            console.log('[PASS] Fresh Login Successful');
        } catch (e) {
            console.error('[FAIL] Fresh Login Failed:', e.response ? JSON.stringify(e.response.data) : e.message);
            return;
        }

        // Connect to DB to expire the user manually
        console.log('3. Manually filtering User to expire account...');
        await mongoose.connect(process.env.MONGO_URI);
        const User = require('./models/user');

        // Find the user and expire them
        const user = await User.findOne({ email: adminEmail });
        if (!user) {
            console.error('[FAIL] User not found in DB');
            return;
        }

        user.expiresAt = new Date(Date.now() - 10000); // Expired 10 seconds ago
        await user.save();
        console.log('[PASS] User manually expired in DB');

        console.log('4. Attempting Login as Expired Admin...');
        try {
            await axios.post(`${BASE_URL}/login`, {
                email: adminEmail,
                password: adminPass
            });
            console.error('[FAIL] Login SUCCEEDED (Should have failed!)');
        } catch (e) {
            if (e.response && e.response.status === 403) {
                console.log('[PASS] Login Failed as expected (403 Forbidden):', e.response.data.message);
            } else {
                console.error('[FAIL] Login Failed with unexpected error:', e.response ? JSON.stringify(e.response.data) : e.message);
            }
        }

        console.log('5. Testing User Registration without Vehicle (Should Fail)...');
        try {
            await axios.post(`${BASE_URL}/register`, {
                name: 'Invalid User',
                email: `user_${Date.now()}@test.com`,
                password: '123',
                phone: '1234567890'
                // No role (default user), No vehicle
            });
            console.error('[FAIL] User Registration without Vehicle SUCCEEDED (Should have failed)');
        } catch (e) {
            if (e.response && e.response.status === 400) {
                console.log('[PASS] User Registration Failed as expected:', e.response.data.message);
            } else {
                console.error('[FAIL] User Registration Failed with unexpected error:', e.response ? JSON.stringify(e.response.data) : e.message);
            }
        }

    } catch (err) {
        console.error('Test script error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

runTest();
