function verifyAdmin(req, res, next) {

    if (!req.session || req.session.roleId !== 2) {
        return res.status(403).json({
            message: 'Access denied. Admin only.'
        });
    }

    next();
}

module.exports = { verifyAdmin };