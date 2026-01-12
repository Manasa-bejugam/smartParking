const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

/**
 * Common validation rules
 */
const validators = {
    // MongoDB ObjectId validation
    mongoId: (field = 'id') =>
        param(field).isMongoId().withMessage('Invalid ID format'),

    // Email validation
    email: () =>
        body('email')
            .isEmail().withMessage('Invalid email format')
            .normalizeEmail(),

    // Password validation (strong password)
    password: () =>
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[0-9]/).withMessage('Password must contain at least one number')
            .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character'),

    // Vehicle number validation (Indian format)
    vehicleNumber: () =>
        body('vehicleNumber')
            .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/)
            .withMessage('Invalid vehicle number format (e.g., MH12AB1234)'),

    // Date/Time validation
    dateTime: (field) =>
        body(field)
            .isISO8601().withMessage(`${field} must be a valid ISO 8601 date`)
            .toDate(),

    // Slot number validation
    slotNumber: () =>
        body('slotNumber')
            .matches(/^[A-Z0-9-]+$/)
            .withMessage('Slot number must contain only letters, numbers, and hyphens'),

    // Pagination validation
    pagination: () => [
        query('page')
            .optional()
            .isInt({ min: 1 }).withMessage('Page must be a positive integer')
            .toInt(),
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
            .toInt()
    ]
};

/**
 * Validation schemas for specific routes
 */
const validationSchemas = {
    // User registration
    register: [
        body('name').trim().notEmpty().withMessage('Name is required'),
        validators.email(),
        validators.password(),
        body('vehicleNumber').optional().matches(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/)
    ],

    // User login
    login: [
        body('identifier')
            .optional()
            .trim()
            .notEmpty().withMessage('Email or Vehicle Number is required'),
        body('email')
            .optional()
            .trim(),
        body('vehicleNumber')
            .optional()
            .trim(),
        body('password').notEmpty().withMessage('Password is required')
    ],

    // Create booking
    createBooking: [
        body('slotId').isMongoId().withMessage('Invalid slot ID'),
        validators.vehicleNumber(),
        validators.dateTime('startTime'),
        validators.dateTime('endTime')
    ],

    // Create slot (admin)
    createSlot: [
        validators.slotNumber(),
        body('city').trim().notEmpty().withMessage('City is required'),
        body('area').trim().notEmpty().withMessage('Area is required'),
        body('address').trim().notEmpty().withMessage('Address is required'),
        body('latitude').optional().isFloat({ min: -90, max: 90 }),
        body('longitude').optional().isFloat({ min: -180, max: 180 })
    ],

    // Process payment
    processPayment: [
        body('bookingId').isMongoId().withMessage('Invalid booking ID'),
        body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
        body('method').isIn(['credit_card', 'paypal', 'upi']).withMessage('Invalid payment method')
    ]
};

module.exports = {
    validate,
    validators,
    validationSchemas
};
