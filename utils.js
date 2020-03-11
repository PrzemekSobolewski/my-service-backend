let jwt = require('jsonwebtoken');

function generateToken(user) {
    if (!user) return null;

    let u = {
        userId: user.userId,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };

    return token = jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

//get details about user
function getCleanUser(user) {
    if (!user) return null;

    return {
        userId: user.userId,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };
}

module.exports = {
    generateToken,
    getCleanUser
};