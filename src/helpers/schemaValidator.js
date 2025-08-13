export const validator = (schema, property = "body") => {
    return (req, res, next) => {
        let data = (property === "query" || property === "params") ? { ...req[property] } : req[property];
        const { value, error } = schema.validate(data || {});
        if (!error) {
            if (property === "query") {
                req.validatedQuery = value;
            } else {
                req[property] = value;
            };
            return next()
        };
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