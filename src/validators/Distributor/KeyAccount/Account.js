import Joi from "joi";

export const addKeyAccountSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    }),
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
    statusId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Status ID should be a type of text',
        'string.empty': 'Status ID cannot be empty',
        'string.pattern.base': 'Status ID must be a valid MongoDB ObjectId',
        'any.required': 'Status ID is a required field',
    }),
    regionId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().messages({
        'string.base': 'Region ID should be a type of text',
        'string.empty': 'Region ID cannot be empty',
        'string.pattern.base': 'Region ID must be a valid MongoDB ObjectId'
    }),
    adoptionLevelId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().messages({
        'string.base': 'Adoption level ID should be a type of text',
        'string.empty': 'Adoption level ID cannot be empty',
        'string.pattern.base': 'Adoption level ID must be a valid MongoDB ObjectId',
    }),
    lastContact: Joi.string().trim().optional().default(null).messages({
        'string.base': 'Last contact should be a type of text',
        'string.empty': 'Last contact  cannot be empty',
    }),
    distributorNameId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().messages({
        'string.base': 'Distributor Role ID should be a type of text',
        'string.empty': 'Distributor Role ID cannot be empty',
        'string.pattern.base': 'Distributor Role ID must be a valid MongoDB ObjectId'
    })
});

export const keyAccountListingQuerySchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    }),
    search: Joi.string().trim().allow("").messages({
        "string.base": "Search must be a string"
    }),
    region: Joi.string().trim().allow("all", "").messages({
        "string.base": "Region must be a string"
    }),
    status: Joi.string().valid("active", "inactive", "pending", "all").messages({
        "any.only": "Status must be one of 'active', 'inactive', 'pending',  or 'all'"
    }),
    distributor: Joi.string().trim().allow("all", "").messages({
        "string.base": "Distributor must be a string"
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

export const deleteAccountSchema = Joi.object({
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

export const updateKeyAccountSchema = Joi.object({
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
    region: Joi.string().trim().min(2).max(50).optional().default(null).messages({
        'string.base': 'Region should be a type of text',
        'string.empty': 'Region cannot be empty',
        'string.min': 'Region have a minimum length of {#limit}',
        'string.max': 'Region should have a maximum length of {#limit}',
        'any.required': 'Region is required.'
    }),
    adoptionLevel: Joi.string().trim().min(2).max(50).optional().default("no contact").messages({
        'string.base': 'Adoption level should be a type of text',
        'string.empty': 'Adoption level cannot be empty',
        'string.min': 'Adoption level have a minimum length of {#limit}',
        'string.max': 'Adoption level should have a maximum length of {#limit}',
    }),
    lastContact: Joi.string().trim().optional().default(null).messages({
        'string.base': 'Last contact should be a type of text',
        'string.empty': 'Last contact  cannot be empty',
    }),
    distributor: Joi.string().trim().min(2).max(50).optional().default(null).messages({
        'string.base': 'Distributor should be a type of text',
        'string.empty': 'Distributor cannot be empty',
        'string.min': 'Distributor have a minimum length of {#limit}',
        'string.max': 'Distributor should have a maximum length of {#limit}',
    }),
});

export const getKeyAccountDetailsSchema = Joi.object({
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