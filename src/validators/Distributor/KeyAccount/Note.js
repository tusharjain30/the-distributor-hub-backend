import Joi from "joi";

export const addAccountNoteSchema = Joi.object({
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
    date: Joi.string().pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/).required().messages({
        "string.pattern.base": "Date must be in MM/DD/YYYY format",
        "any.required": "Date is required"
    }),
    note: Joi.string().trim().min(2).max(300).required().messages({
        'string.base': 'Note should be a type of text',
        'string.empty': 'Note cannot be empty',
        'string.min': 'Note have a minimum length of {#limit}',
        'string.max': 'Note should have a maximum length of {#limit}',
        'any.required': 'Note is required.'
    }),
});

export const deleteAccountNoteSchema = Joi.object({
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
    noteId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Note ID should be a type of text',
        'string.empty': 'Note ID cannot be empty',
        'string.pattern.base': 'Note ID must be a valid MongoDB ObjectId',
        'any.required': 'Note ID is a required field',
    }),
});

export const keyAccountNoteListingSchema = Joi.object({
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