function verifyAdmin(req, res, next) {

    console.log("Role ID:", req.headers.roleid);

    if (req.headers.roleid != 2) {
        console.log("Access denied - Not an admin");

        return res.status(403).json({
            message: 'Access denied. Admin only.'
        });
    }

    console.log("Admin access granted");

    next();
}

module.exports = { verifyAdmin };