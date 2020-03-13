let jwt = require('jsonwebtoken');

function generateToken(user) {
    if (!user) return null;

    let u = {
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
        email: user[0].email,
        userId: user[0]._id
    };
}

module.exports = {
    generateToken,
    getCleanUser
};