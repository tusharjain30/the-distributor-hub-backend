import Joi from "joi";

export const addKeyAccountContactSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    }),
    accountId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Account ID should be a type of text',
        'string.empty': 'Account ID cannot be empty',
        'string.pattern.base': 'Account ID must be a valid MongoDB ObjectId',
        'any.required': 'Account ID is a required field',
    }),
    contactName: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Contact name should be a type of text',
        'string.empty': 'Contact name cannot be empty',
        'string.min': 'Contact name have a minimum length of {#limit}',
        'string.max': 'Contact name should have a maximum length of {#limit}',
        'any.required': 'Contact name is required.'
    }),
    jobTitle: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Job title should be a type of text',
        'string.empty': 'Job title cannot be empty',
        'string.min': 'Job title have a minimum length of {#limit}',
        'string.max': 'Job title should have a maximum length of {#limit}',
        'any.required': 'Job title is required.'
    }),
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'org'] } }).required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email',
        'string.lowercase': 'Email must be in lowercase',
        'any.required': 'Email is required.'
    }),
    phone: Joi.string().trim().pattern(/^\d{10}$/).required().messages({
        'string.base': 'Phone number should be a type of text.',
        'string.empty': 'Phone number cannot be empty.',
        'string.pattern.base': 'Phone number must be only 10 digits (e.g., 5551234567).',
        'any.required': 'Phone number is required.'
    }),
    isPrimary: Joi.boolean().optional().default(false).messages({
        'boolean.base': 'The "isPrimary" field must be a boolean (true or false).'
    }),
});

export const deleteKeyAccountContactSchema = Joi.object({
    contactId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Contact ID should be a type of text',
        'string.empty': 'Contact ID cannot be empty',
        'string.pattern.base': 'Contact ID must be a valid MongoDB ObjectId',
        'any.required': 'Contact ID is a required field',
    }),
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    }),
    accountId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Account ID should be a type of text',
        'string.empty': 'Account ID cannot be empty',
        'string.pattern.base': 'Account ID must be a valid MongoDB ObjectId',
        'any.required': 'Account ID is a required field',
    }),
});

export const keyAccountContactListingSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    }),
    accountId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Account ID should be a type of text',
        'string.empty': 'Account ID cannot be empty',
        'string.pattern.base': 'Account ID must be a valid MongoDB ObjectId',
        'any.required': 'Account ID is a required field',
    }),
    page: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'Page must be a number.',
        'number.integer': 'Page must be an integer.',
        'number.min': 'Page cannot be less than one.'
    }),
    limit: Joi.number().integer().min(1).default(10).messages({
        'number.base': 'Limit must be a number.',
        'number.integer': 'Limit must be an integer.',
        'number.min': 'Limit cannot be less than one.'
    }),
});