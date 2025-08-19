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
    lastContact: Joi.string().pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/).optional().default(null).messages({
        "string.pattern.base": "Last Contact must be in MM/DD/YYYY format"
    }),
    distributorNameId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().messages({
        'string.base': 'Distributor name ID should be a type of text',
        'string.empty': 'Distributor name ID cannot be empty',
        'string.pattern.base': 'Distributor name ID must be a valid MongoDB ObjectId'
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
    regionId: Joi.alternatives().try(
        Joi.string().valid("all").messages({
            "any.only": "Region ID must be 'all' or a valid ObjectId",
        }),
        Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
            "string.pattern.base": "Region ID must be a valid MongoDB ObjectId"
        })
    ).optional().messages({
        'string.empty': 'Region ID cannot be empty',
        "alternatives.match": "Region ID must be either 'all' or a valid MongoDB ObjectId"
    }),
    statusId: Joi.alternatives().try(
        Joi.string().valid("all").messages({
            "any.only": "Status ID must be 'all' or a valid ObjectId",
        }),
        Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
            "string.pattern.base": "Status ID must be a valid MongoDB ObjectId"
        })
    ).optional().messages({
        'string.empty': 'Status ID cannot be empty',
        "alternatives.match": "Status ID must be either 'all' or a valid MongoDB ObjectId"
    }),
    distributorNameId: Joi.alternatives().try(
        Joi.string().valid("all").messages({
            "any.only": "Distributor name ID must be 'all' or a valid ObjectId",
        }),
        Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
            "string.pattern.base": "Distributor name ID must be a valid MongoDB ObjectId"
        })
    ).optional().messages({
        'string.empty': 'Distributor name ID cannot be empty',
        "alternatives.match": "Distributor name ID must be either 'all' or a valid MongoDB ObjectId"
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
    accountId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Account ID should be a type of text',
        'string.empty': 'Account ID cannot be empty',
        'string.pattern.base': 'Account ID must be a valid MongoDB ObjectId',
        'any.required': 'Account ID is a required field',
    }),
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
    regionId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Region ID should be a type of text',
        'string.empty': 'Region ID cannot be empty',
        'string.pattern.base': 'Region ID must be a valid MongoDB ObjectId',
        'any.required': 'Region ID is a required field',
    }),
    adoptionLevelId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Adoption level ID should be a type of text',
        'string.empty': 'Adoption level ID cannot be empty',
        'string.pattern.base': 'Adoption level ID must be a valid MongoDB ObjectId',
        'any.required': 'Adoption level is a required field',
    }),
    lastContact: Joi.string().pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/).required().messages({
        "string.pattern.base": "Last Contact must be in MM/DD/YYYY format",
        "any.required": "Last Contact is required"
    }),
    distributorNameId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor name ID should be a type of text',
        'string.empty': 'Distributor name ID cannot be empty',
        'string.pattern.base': 'Distributor name ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor name ID is a required field',
    })
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