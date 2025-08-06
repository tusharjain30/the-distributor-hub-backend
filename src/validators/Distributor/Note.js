import Joi from "joi";

export const noteSchema = Joi.string().trim().min(2).max(500).required().messages({
    'string.base': 'Note should be a type of text.',
    'string.empty': 'Note cannot be empty.',
    'string.min': 'Note length cannot be less than {#limit} characters.',
    'string.max': 'Note length cannot be more than {#limit} characters.',
    'any.required': 'Note is required.',
});