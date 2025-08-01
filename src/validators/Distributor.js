import Joi from "joi";

export const distributorSchema = Joi.object({
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
        'any.required': 'Phone number is required.'
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

export const contactSchema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name have a minimum length of {#limit}',
        'string.max': 'Name should have a maximum length of {#limit}',
        'any.required': 'Name is required.'
    }),
    title: Joi.string().trim().min(2).max(50).required().messages({
        'string.base': 'Title should be a type of text',
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title have a minimum length of {#limit}',
        'string.max': 'Title should have a maximum length of {#limit}',
        'any.required': 'Title is required.'
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
    isPrimary: Joi.boolean().default(false).messages({
        'boolean.base': 'The "isPrimary" field must be a boolean (true or false).'
    })
});

export const noteSchema = Joi.string().trim().min(2).max(500).required().messages({
    'string.base': 'Note should be a type of text.',
    'string.empty': 'Note cannot be empty.',
    'string.min': 'Note length cannot be less than {#limit} characters.',
    'string.max': 'Note length cannot be more than {#limit} characters.',
    'any.required': 'Note is required.',
});

export const keyAccountSchema = Joi.object({
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
});

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

export const salesDataSchema = Joi.object({
    month: Joi.string().trim().pattern(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/).required().messages({
        'string.base': 'Month should be a type of text.',
        'string.empty': 'Month cannot be empty.',
        'string.pattern.base': 'Month must follow the pattern "Mon YYYY" (e.g., Jul 2025).',
        'any.required': 'Month is required.',
    }),
    productName: Joi.string().trim().min(2).max(50).required().messages({
        'string.base': 'Product name should be a type of text',
        'string.empty': 'Product name cannot be empty',
        'string.min': 'Product name have a minimum length of {#limit}',
        'string.max': 'Product name should have a maximum length of {#limit}',
        'any.required': 'Product name is required.'
    }),
    revenue: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Revenue must be a valid number.',
        'number.positive': 'Revenue must be a positive number.',
        'number.precision': 'Revenue must have no more than 2 decimal places.',
        'any.required': 'Revenue is required.',
    }),
    unitsSold: Joi.number().integer().min(0).required().messages({
        'number.base': 'Units sold must be a number.',
        'number.integer': 'Units sold must be an integer.',
        'number.min': 'Units sold cannot be less than zero.',
        'any.required': 'Units sold is required.',
    }),
});




