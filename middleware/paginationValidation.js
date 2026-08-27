function validatePagination(req, res, next) {

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    // If page is provided, it must be a positive integer
    if (req.query.page !== undefined) {
        if (!Number.isInteger(page) || page < 1) {
            return res.status(400).send("Page must be a positive integer");
        }
    }

    // If limit is provided, it must be a positive integer
    if (req.query.limit !== undefined) {
        if (!Number.isInteger(limit) || limit < 1) {
            return res.status(400).send("Limit must be a positive integer");
        }

        // Prevent requesting too many notes
        if (limit > 50) {
            return res.status(400).send("Limit cannot be greater than 50");
        }
    }

    next();
}

module.exports = validatePagination;