const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        req.userData = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Auth failed"
        });
    }
};