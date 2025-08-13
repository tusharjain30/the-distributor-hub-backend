import Joi from "joi";

export const addNoteSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    }),
    content: Joi.string().trim().min(2).max(500).required().messages({
        'string.base': 'Content should be a type of text.',
        'string.empty': 'Content cannot be empty.',
        'string.min': 'Content length cannot be less than {#limit} characters.',
        'string.max': 'Content length cannot be more than {#limit} characters.',
        'any.required': 'Content is required.',
    }),
});

export const noteListingSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
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

export const deleteNoteSchema = Joi.object({
    distributorId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Distributor ID should be a type of text',
        'string.empty': 'Distributor ID cannot be empty',
        'string.pattern.base': 'Distributor ID must be a valid MongoDB ObjectId',
        'any.required': 'Distributor ID is a required field',
    }),
    noteId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'Note ID should be a type of text',
        'string.empty': 'Note ID cannot be empty',
        'string.pattern.base': 'Note ID must be a valid MongoDB ObjectId',
        'any.required': 'Note ID is a required field',
    }),
});