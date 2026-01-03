/**
 * Fee Calculation Service
 * Calculates parking fees based on duration
 * Pricing: ₹20 per hour (₹5 per 15 minutes)
 * Rounds up to nearest 15-minute interval
 */

class FeeCalculationService {
    constructor() {
        this.RATE_PER_HOUR = 20.0;      // ₹20 per hour
        this.RATE_PER_15_MIN = 5.0;     // ₹5 per 15 minutes
    }

    /**
     * Calculates the parking fee based on duration
     * Logic:
     * 1. Get total duration in minutes
     * 2. Round up to nearest 15-minute interval
     * 3. Calculate fee: (rounded minutes / 15) × ₹5
     * 
     * @param {number} durationMinutes - Parking duration in minutes
     * @returns {Object} Fee details { actualDuration, roundedDuration, fee }
     */
    calculateFee(durationMinutes) {
        if (durationMinutes <= 0) {
            console.log('✗ Error: Invalid duration');
            return {
                actualDuration: 0,
                roundedDuration: 0,
                fee: 0
            };
        }

        // Round up to nearest 15-minute interval
        const roundedMinutes = this.roundUpTo15Minutes(durationMinutes);

        // Calculate fee: (rounded minutes / 15) × ₹5
        const fee = (roundedMinutes / 15.0) * this.RATE_PER_15_MIN;

        console.log('✓ Fee calculated:');
        console.log(`  Actual duration: ${durationMinutes} minutes`);
        console.log(`  Rounded to: ${roundedMinutes} minutes`);
        console.log(`  Fee: ₹${fee}`);

        return {
            actualDuration: durationMinutes,
            roundedDuration: roundedMinutes,
            fee: fee
        };
    }

    /**
     * Rounds up duration to nearest 15-minute interval
     * Examples:
     * - 1-15 minutes → 15 minutes
     * - 16-30 minutes → 30 minutes
     * - 31-45 minutes → 45 minutes
     * - 46-60 minutes → 60 minutes
     * 
     * @param {number} minutes - Duration in minutes
     * @returns {number} Rounded duration
     */
    roundUpTo15Minutes(minutes) {
        if (minutes <= 0) {
            return 0;
        }

        // Round up to nearest 15-minute interval
        return Math.ceil(minutes / 15) * 15;
    }

    /**
     * Gets a breakdown of the fee calculation
     * @param {number} durationMinutes - Duration in minutes
     * @returns {string} Fee breakdown description
     */
    getFeeBreakdown(durationMinutes) {
        const roundedMinutes = this.roundUpTo15Minutes(durationMinutes);
        const fee = (roundedMinutes / 15.0) * this.RATE_PER_15_MIN;

        const hours = Math.floor(roundedMinutes / 60);
        const minutes = roundedMinutes % 60;

        return `Duration: ${durationMinutes} min → Charged: ${roundedMinutes} min (${hours}h ${minutes}m) → Fee: ₹${fee}`;
    }

    /**
     * Gets pricing information
     * @returns {Object} Pricing details
     */
    getPricingInfo() {
        return {
            ratePerHour: this.RATE_PER_HOUR,
            ratePer15Min: this.RATE_PER_15_MIN,
            minimumCharge: this.RATE_PER_15_MIN,
            billingInterval: '15 minutes'
        };
    }
}

module.exports = new FeeCalculationService();
