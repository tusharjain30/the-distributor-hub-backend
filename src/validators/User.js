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
    regions: Joi.array().items(Joi.string().valid("northAmerica", "europe", "asiaPacific", "latinAmerica", "middleEast&Africa")
    ).when('role', {
        is: 'regionalManager',
        then: Joi.array().min(1).required(),
        otherwise: Joi.forbidden()
    }).messages({
        'array.base': 'Regions must be an array of strings.',
        'array.min': 'At least one region must be selected for Regional Managers.',
        'any.only': 'Regions must be one of {{#valids}}',
        'any.forbidden': 'Regions are not allowed.',
        'any.required': 'Regions is a required field for Regional Managers.',
    }),
    distributorId: Joi.string().valid("1", "2", "3", "4", "5").when('role', {
        is: 'distributor',
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }).messages({
        'any.only': 'Distributor id must be one of {{#valids}}',
        'any.forbidden': 'Distributor id are not allowed.',
        'any.required': 'Distributor id is a required field.',
    }),
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
    name: Joi.string().trim().min(2).max(30).optional().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
    }),
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'org'] } }).optional().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email',
        'string.lowercase': 'Email must be in lowercase',
    }),
    distributorId: Joi.string().valid("1", "2", "3", "4", "5").optional().messages({
        'any.only': 'Distributor id must be one of {{#valids}}'
    }),
    regions: Joi.array().min(1).items(Joi.string().valid("northAmerica", "europe", "asiaPacific", "latinAmerica", "middleEast&Africa")
    ).optional().messages({
        'array.base': 'Regions must be an array of strings.',
        'array.min': 'At least one region must be selected for Regional Managers.',
        'any.only': 'Regions must be one of {{#valids}}',
    }),
}).min(1).messages({
    'object.min': 'At least one field must be provided for update',
});



