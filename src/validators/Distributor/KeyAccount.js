import Joi from "joi";

export const keyAccountSchema = Joi.object({
    contactName: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Contact name should be a type of text',
        'string.empty': 'Contact name cannot be empty',
        'string.min': 'Contact name have a minimum length of {#limit}',
        'string.max': 'Contact name should have a maximum length of {#limit}',
        'any.required': 'Contact name is required.'
    }),
    companyName: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Company name should be a type of text',
        'string.empty': 'Company name cannot be empty',
        'string.min': 'Company name have a minimum length of {#limit}',
        'string.max': 'Company name should have a maximum length of {#limit}',
        'any.required': 'Company name is required.'
    }),
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'org'] } }).required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email',
        'string.lowercase': 'Email must be in lowercase',
        'any.required': 'Email is required.'
    }),
    phone: Joi.string().trim().pattern(/^\d{3}-\d{3}-\d{4}$/).required().messages({
        'string.base': 'Phone number should be a type of text.',
        'string.empty': 'Phone number cannot be empty.',
        'string.pattern.base': 'Phone number must be in the format XXX-XXX-XXXX (e.g., 555-123-4567).',
        'any.required': 'Phone number is required.'
    }),
    value: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Value must be a valid number.',
        'number.positive': 'Value must be a positive number.',
        'number.precision': 'Value must have no more than 2 decimal places.',
        'any.required': 'Value is required.',
    }),
    status: Joi.string().trim().valid("active", "inactive", "pending").required().messages({
        'string.base': 'Status should be a type of text',
        'any.only': 'Status must be one of {{#valids}}',
        'any.required': 'Status is a required field',
    }),
});