import Joi from "joi";

export const addDistributorSchema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required.'
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
        'any.required': 'Phone is required.'
    }),
    website: Joi.string().uri().allow('').messages({
        'string.uri': 'Please enter a valid website URL.',
    }),
    region: Joi.string().trim().min(2).max(50).required().messages({
        'string.base': 'Region should be a type of text',
        'string.empty': 'Region cannot be empty',
        'string.min': 'Region have a minimum length of {#limit}',
        'string.max': 'Region should have a maximum length of {#limit}',
        'any.required': 'Region is required.'
    }),
    country: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Country should be a type of text',
        'string.empty': 'Country cannot be empty',
        'string.min': 'Country have a minimum length of {#limit}',
        'string.max': 'Country should have a maximum length of {#limit}',
        'any.required': 'Country is required.'
    }),
    status: Joi.string().trim().valid("active", "inactive", "pending").required().messages({
        'string.base': 'Status should be a type of text',
        'any.only': 'Status must be one of {{#valids}}',
        'any.required': 'Status is a required field',
    }),
    annualRevenue: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Annual revenue must be a valid number.',
        'number.positive': 'Annual revenue must be a positive number.',
        'number.precision': 'Annual revenue must have no more than 2 decimal places.',
        'any.required': 'Annual revenue is required.',
    })
});

export const updateDistributorSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    }),
    name: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required.'
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
        'any.required': 'Phone is required.'
    }),
    website: Joi.string().uri().allow('').messages({
        'string.uri': 'Please enter a valid website URL.',
    }),
    region: Joi.string().trim().min(2).max(50).required().messages({
        'string.base': 'Region should be a type of text',
        'string.empty': 'Region cannot be empty',
        'string.min': 'Region have a minimum length of {#limit}',
        'string.max': 'Region should have a maximum length of {#limit}',
        'any.required': 'Region is required.'
    }),
    country: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Country should be a type of text',
        'string.empty': 'Country cannot be empty',
        'string.min': 'Country have a minimum length of {#limit}',
        'string.max': 'Country should have a maximum length of {#limit}',
        'any.required': 'Country is required.'
    }),
    status: Joi.string().trim().valid("active", "inactive", "pending").required().messages({
        'string.base': 'Status should be a type of text',
        'any.only': 'Status must be one of {{#valids}}',
        'any.required': 'Status is a required field',
    }),
    annualRevenue: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Annual revenue must be a valid number.',
        'number.positive': 'Annual revenue must be a positive number.',
        'number.precision': 'Annual revenue must have no more than 2 decimal places.',
        'any.required': 'Annual revenue is required.',
    })
});

export const deleteDistributorSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    })
});

export const distributorListingQuerySchema = Joi.object({
    search: Joi.string().trim().allow("").messages({
        "string.base": "Search must be a string"
    }),
    region: Joi.string().trim().allow("all", "").messages({
        "string.base": "Region must be a string"
    }),
    status: Joi.string().valid("active", "inactive", "pending", "all").messages({
        "any.only": "Status must be one of 'active', 'inactive', 'pending',  or 'all'"
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

export const getDistributorDetailsSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    })
});