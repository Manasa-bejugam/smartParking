const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api';
const JWT_SECRET = process.env.JWT_SECRET || "smartparking_jwt_secret";

// Generate Admin Token for Authentication
// The admin middleware expects req.user.role, so we sign it at the top level
const adminToken = jwt.sign({
    role: 'admin',
    id: 'verify_admin'
}, JWT_SECRET, { expiresIn: '1h' });

const config = {
    headers: { 'x-auth-token': adminToken }
};

async function runTest() {
    try {
        console.log('--- Verifying Slot Availability Fix ---');

        const slotNum = "A9_TEST_" + Date.now();

        console.log('1. Creating Slot with isAvailable: true ...');
        try {
            const createRes = await axios.post(`${BASE_URL}/admin/create-slot`, {
                slotNumber: slotNum,
                isAvailable: true, // Explicitly sending true
                section: 'Test',
                city: 'Hyderabad',
                area: 'Madhapur',
                address: 'Test Complex',
                placeType: 'Shopping Mall'
            }, config);

            const createdSlot = createRes.data.slot;
            console.log(`[CHECK] Created Slot Status: isAvailable = ${createdSlot.isAvailable}`);

            if (createdSlot.isAvailable === true) {
                console.log('[PASS] Slot created successfully as AVAILABLE.');
            } else {
                console.error('[FAIL] Slot created as BOOKED (isAvailable=false).');
            }

            // Cleanup
            console.log('2. Cleaning up...');
            await axios.delete(`${BASE_URL}/admin/slot/${createdSlot._id}`, config);
            console.log('[PASS] Cleanup successful.');

        } catch (e) {
            console.error('[FAIL] Operation Failed:', e.response ? JSON.stringify(e.response.data) : e.message);
        }

    } catch (err) {
        console.error('Test script error:', err);
    }
}

runTest();
