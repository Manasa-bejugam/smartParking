const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api';
const JWT_SECRET = process.env.JWT_SECRET || "smartparking_jwt_secret";

const adminToken = jwt.sign({
    role: 'admin',
    id: 'cleanup_admin'
}, JWT_SECRET, { expiresIn: '1h' });

const config = {
    headers: { 'x-auth-token': adminToken }
};

async function cleanup() {
    try {
        console.log('--- Cleaning up Slot A9 ---');

        // 1. Get all slots to find A9's ID
        const res = await axios.get(`${BASE_URL}/admin/create-slot`, config).catch(e => {
            // create-slot is POST. But usually there is a GET slots.
            // AdminDashboard calls fetchSlots() -> /api/slots/all
        });

        // Using public slots endpoint or admin endpoint?
        // /api/slots/all
        const slotsRes = await axios.get(`${BASE_URL}/slots/all`);
        const slots = slotsRes.data.slots;

        const slotA9 = slots.find(s => s.slotNumber === 'A9');

        if (slotA9) {
            console.log(`Found Slot A9 (ID: ${slotA9._id}). Deleting...`);
            await axios.delete(`${BASE_URL}/admin/slot/${slotA9._id}`, config);
            console.log('[SUCCESS] Slot A9 deleted.');
        } else {
            console.log('[INFO] Slot A9 not found.');
        }

    } catch (err) {
        console.error('Cleanup error:', err.message);
    }
}

cleanup();
