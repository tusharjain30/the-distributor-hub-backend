import Joi from "joi";

export const inventorySchema = Joi.object({
    sku: Joi.string().trim().pattern(/^PRD-\d{3}$/).required().messages({
        'string.base': 'SKU should be a type of text.',
        'string.empty': 'SKU cannot be empty.',
        'string.pattern.base': 'SKU must follow the pattern "PRD-XXX" (e.g., PRD-001).',
        'any.required': 'SKU is required.',
    }),
    name: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required.'
    }),
    category: Joi.string().trim().valid(
        "diagnostics", "consumables", "instruments", "disposables", "therapeutics", "sterilization", "implants",
    ).required().messages({
        'string.base': 'Category should be a type of text',
        'any.only': 'Category must be one of {{#valids}}',
        'any.required': 'Category is a required field',
    }),
    stockLevel: Joi.number().integer().min(0).required().messages({
        'number.base': 'Stock level must be a number.',
        'number.integer': 'Stock level must be an integer.',
        'number.min': 'Stock level cannot be less than zero.',
        'any.required': 'Stock level is required.',
    }),
    reorderPoint: Joi.number().integer().min(0).required().messages({
        'number.base': 'Reorder point must be a number.',
        'number.integer': 'Reorder point must be an integer.',
        'number.min': 'Reorder point cannot be less than zero.',
        'any.required': 'Reorder point is required.',
    }),
    unitPrice: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Unit price must be a valid number.',
        'number.positive': 'Unit price must be a positive number.',
        'number.precision': 'Unit price must have no more than 2 decimal places.',
        'any.required': 'Unit price is required.',
    })
});