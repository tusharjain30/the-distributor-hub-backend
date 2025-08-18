import Joi from "joi";

export const registerSchema = Joi.object({
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
    role: Joi.string().trim().valid("manufacturer", "regionalManager", "distributor").required().messages({
        'string.base': 'Role should be a type of text',
        'any.only': 'Role must be one of {{#valids}}',
        'any.required': 'Role is a required field',
    }),
    regions: Joi.when('role', {
        is: 'regionalManager',
        then: Joi.array()
            .items(
                Joi.string()
                    .pattern(/^[0-9a-fA-F]{24}$/, 'valid ObjectId')
                    .messages({
                        'string.pattern.name': 'Each region ID must be a valid MongoDB ObjectId.',
                        'string.empty': 'region ID cannot be empty',
                        'string.base': 'Region ID must be a string.'
                    })
            )
            .min(1).required().messages({
                'array.base': 'Regions must be an array of valid IDs.',
                'array.min': 'At least one region must be selected for a Regional Manager.',
                'any.required': 'Regions is a required field for Regional Managers.'
            }),
        otherwise: Joi.forbidden().messages({
            'any.unknown': 'Regions are only allowed for Regional Managers.'
        })
    }),
    distributorId: Joi.when('role', {
        is: 'distributor',
        then: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                'string.base': 'Distributor ID must be a string.',
                'string.empty': 'Distributor ID cannot be empty',
                'string.pattern.base': 'Distributor ID must be a valid 24-character ObjectId.',
                'any.required': 'Distributor ID is a required field for Distributors.'
            }),
        otherwise: Joi.forbidden().messages({
            'any.unknown': 'Distributor ID is only allowed for users with the Distributor role.'
        })
    })
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'org'] } }).required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email',
        'string.lowercase': 'Email must be in lowercase',
        'any.required': 'Email is required.'
    }),
    role: Joi.string().trim().valid("manufacturer", "regionalManager", "distributor").required().messages({
        'string.base': 'Role should be a type of text',
        'any.only': 'Role must be one of {{#valids}}',
        'any.required': 'Role is a required field',
    }),
});

export const updateProfileSchema = Joi.object({
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
    role: Joi.string().trim().valid("manufacturer", "regionalManager", "distributor").required().messages({
        'string.base': 'Role should be a type of text',
        'any.only': 'Role must be one of {{#valids}}',
        'any.required': 'Role is a required field',
    }),
    regions: Joi.when('role', {
        is: 'regionalManager',
        then: Joi.array().items(
            Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
                'string.pattern.base': 'Each region must be a valid ObjectId.',
                'string.empty': 'Region id cannot be empty'
            })
        ).min(1).required().messages({
            'array.base': 'Regions must be an array of strings.',
            'array.min': 'At least one region must be selected for Regional Managers.',
            'any.required': 'Regions are required for Regional Managers.'
        }),
        otherwise: Joi.forbidden().messages({
            'any.unknown': 'Regions are only allowed for Regional Managers.'
        })
    }),
    distributorId: Joi.when('role', {
        is: 'distributor',
        then: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                'string.base': 'Distributor ID must be a string.',
                'string.empty': 'Distributor ID cannot be empty',
                'string.pattern.base': 'Distributor ID must be a valid 24-character ObjectId.',
                'any.required': 'Distributor ID is a required field for Distributors.'
            }),
        otherwise: Joi.forbidden().messages({
            'any.unknown': 'Distributor ID is only allowed for users with the Distributor role.'
        })
    })
});


