require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server listening on: ' + port);
});
/*const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 4000;

const userData = {
    userId: "999999",
    password: "root",
    name: "Przemek Sobolewski",
    username: "PrzemekSobolewski",
    isAdmin: true
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    token = token.replace('Elo ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user;
            next();
        }
    });
});

app.get('/', (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
    res.send('Welcome to the MY SERVICE! - ' + req.user.name);
});

app.post('/users/signin', function (req, res) {
    const user = req.body.username;
    const pwd = req.body.password;

    if(!user || !pwd) {
        return res.status(400).json({
           error: true,
           message: "Username or Password required."
        });
    }

    if(user !== userData.username || pwd !== userData.password) {
        return res.status(401).json({
            error: true,
            message: "Invalid Username or Password."
        });
    }

    const token = utils.generateToken(userData);
    const userObj = utils.getCleanUser(userData);

    return res.json({ user: userObj, token });
});

app.get('/verifyToken', function (req, res) {
    const token = req.body.token || req.query.token;
    if(!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });

        if (user.userId !== userData.userId) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }
        const userObj = utils.getCleanUser(userData);
        return res.json({ user: userObj, token });
    });
});


app.listen(port, () => {
    console.log('Server listening on: ' + port);
});*/
