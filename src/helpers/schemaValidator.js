export const validator = (schema, property = "body") => {
    return (req, res, next) => {
        const { value, error } = schema.validate(req[property] || {})
        if (!error) {
            req[property] = value
            return next()
        }
        const errorDetails = error.details.map(detail => ({
            path: detail.path.join('.'),
            message: detail.message
        }));
        return res.status(400).json({
            success: 0,
            message: errorDetails[0].message,
            statusCode: 400,
            data: {}
        });
    };
};