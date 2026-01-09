/**
 * Force Update Slot Names to Shorter Format
 * This script updates ALL slots to use the new shorter naming convention
 */

const mongoose = require('mongoose');
const Slot = require('../models/slotModel');
const { generateSlotName, parseSlotName } = require('../utils/slotNaming');
require('dotenv').config();

async function forceUpdateSlotNames() {
    try {
        console.log('🚀 Force updating slot names to shorter format...\n');

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        const slots = await Slot.find();
        console.log(`📊 Found ${slots.length} slots to update\n`);

        let updated = 0;
        console.log('🔄 Processing slots...\n');
        console.log('─'.repeat(80));

        for (const slot of slots) {
            try {
                const oldName = slot.slotNumber;

                // Parse the old name to get the slot ID
                const parsed = parseSlotName(oldName);
                const slotId = parsed.slotId || oldName;

                // Generate new shorter name
                const newName = generateSlotName(
                    slot.city || 'Hyderabad',
                    slot.address || 'Smart Parking Complex',
                    slotId,
                    slot.placeType
                );

                // Update if different
                if (oldName !== newName) {
                    slot.slotNumber = newName;
                    await slot.save();
                    console.log(`✅ UPDATE: ${oldName.padEnd(20)} → ${newName}`);
                    updated++;
                } else {
                    console.log(`⏭️  SKIP: ${oldName} (already correct)`);
                }

            } catch (error) {
                console.error(`❌ ERROR: Failed to update ${slot.slotNumber} - ${error.message}`);
            }
        }

        console.log('─'.repeat(80));
        console.log(`\n✨ Updated ${updated} slots to shorter format!\n`);

    } catch (error) {
        console.error('❌ Update failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Database connection closed');
        process.exit(0);
    }
}

forceUpdateSlotNames();
