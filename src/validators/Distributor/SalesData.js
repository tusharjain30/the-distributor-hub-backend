import Joi from "joi";

export const salesDataSchema = Joi.object({
    month: Joi.string().trim().pattern(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/).required().messages({
        'string.base': 'Month should be a type of text.',
        'string.empty': 'Month cannot be empty.',
        'string.pattern.base': 'Month must follow the pattern "Mon YYYY" (e.g., Jul 2025).',
        'any.required': 'Month is required.',
    }),
    productName: Joi.string().trim().min(2).max(50).required().messages({
        'string.base': 'Product name should be a type of text',
        'string.empty': 'Product name cannot be empty',
        'string.min': 'Product name have a minimum length of {#limit}',
        'string.max': 'Product name should have a maximum length of {#limit}',
        'any.required': 'Product name is required.'
    }),
    revenue: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Revenue must be a valid number.',
        'number.positive': 'Revenue must be a positive number.',
        'number.precision': 'Revenue must have no more than 2 decimal places.',
        'any.required': 'Revenue is required.',
    }),
    unitsSold: Joi.number().integer().min(0).required().messages({
        'number.base': 'Units sold must be a number.',
        'number.integer': 'Units sold must be an integer.',
        'number.min': 'Units sold cannot be less than zero.',
        'any.required': 'Units sold is required.',
    }),
});




