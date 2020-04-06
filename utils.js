let jwt = require('jsonwebtoken');

function generateToken(user) {
    if (!user) return null;

    let u = {
        userName: user[0].userName,
        email: user[0].email,
        userId: user[0]._id
    };

    return token = jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

//get details about user
function getCleanUser(user) {
    if (!user) return null;

    return {
        userName: user[0].userName,
        email: user[0].email,
        userId: user[0]._id
    };
}

function decodeToken(token) {
    return decoded = jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    decodeToken,
    getCleanUser
};