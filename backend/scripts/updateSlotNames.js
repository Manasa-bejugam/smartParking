/**
 * Migration Script: Update Slot Names
 * 
 * This script updates all existing slots to use the new naming convention:
 * Format: {CITY_CODE}-{PLACE_CODE}-{SLOT_ID}
 * Example: HYD-INORBIT-A1
 * 
 * Usage: node scripts/updateSlotNames.js
 */

const mongoose = require('mongoose');
const Slot = require('../models/slotModel');
const { generateSlotName, isNewFormat } = require('../utils/slotNaming');
require('dotenv').config();

// Backup file for rollback
const fs = require('fs');
const path = require('path');

async function updateSlotNames() {
    try {
        console.log('🚀 Starting slot name migration...\n');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Fetch all slots
        const slots = await Slot.find();
        console.log(`📊 Found ${slots.length} slots to process\n`);

        if (slots.length === 0) {
            console.log('⚠️  No slots found in database');
            process.exit(0);
        }

        // Create backup
        const backup = slots.map(s => ({
            _id: s._id.toString(),
            oldName: s.slotNumber,
            city: s.city,
            address: s.address,
            placeType: s.placeType
        }));

        const backupPath = path.join(__dirname, `slot_backup_${Date.now()}.json`);
        fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
        console.log(`💾 Backup created: ${backupPath}\n`);

        // Process each slot
        let updated = 0;
        let skipped = 0;
        let errors = 0;

        console.log('🔄 Processing slots...\n');
        console.log('─'.repeat(80));

        for (const slot of slots) {
            try {
                // Skip if already in new format
                if (isNewFormat(slot.slotNumber)) {
                    console.log(`⏭️  SKIP: ${slot.slotNumber} (already in new format)`);
                    skipped++;
                    continue;
                }

                // Generate new name
                const oldName = slot.slotNumber;
                const newName = generateSlotName(
                    slot.city || 'Hyderabad',
                    slot.address || 'Smart Parking Complex',
                    oldName,
                    slot.placeType
                );

                // Update slot
                slot.slotNumber = newName;
                await slot.save();

                console.log(`✅ UPDATE: ${oldName.padEnd(15)} → ${newName}`);
                updated++;

            } catch (error) {
                console.error(`❌ ERROR: Failed to update ${slot.slotNumber} - ${error.message}`);
                errors++;
            }
        }

        console.log('─'.repeat(80));
        console.log('\n📈 Migration Summary:');
        console.log(`   ✅ Updated: ${updated}`);
        console.log(`   ⏭️  Skipped: ${skipped}`);
        console.log(`   ❌ Errors:  ${errors}`);
        console.log(`   📊 Total:   ${slots.length}\n`);

        if (updated > 0) {
            console.log('✨ Migration completed successfully!');
            console.log(`💾 Backup saved to: ${backupPath}`);
        } else {
            console.log('⚠️  No slots were updated');
        }

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
        process.exit(0);
    }
}

// Run migration
updateSlotNames();
