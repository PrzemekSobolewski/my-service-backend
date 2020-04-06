const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const utils = require('../utils');
const User = require("../models/user");
const checkAuth = require("../middleware/check-auth")

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "User already exists"
                });
            } else {
                User.find({userName: req.body.userName})
                .exec()
                .then(userName => {
                    if (userName.length >= 1) {
                        return res.status(409).json({
                            message: "There is already user with this name"
                        });
                    } else { 
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                });
                            } else {
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    userName: req.body.userName,
                                    email: req.body.email,
                                    password: hash
                                });
                                user
                                    .save()
                                    .then(result => {
                                        console.log(result);
                                        res.status(201).json({
                                            message: "User created"
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json({
                                            error: err
                                        });
                                    })
                            }
                        });
                    }
                });
            }
        });
});

router.delete('/:userId', checkAuth,  (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1) {
                res.status(404).json({
                    message: "User not exist. Log in failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    console.log(err);
                    return res.status(401).json({
                        error: "Auth failed. Invalid password"
                    })
                }
                if(result) {
                    const token = utils.generateToken(user);
                    const userObj = utils.getCleanUser(user);
                    utils.decodeToken(token);
                    return res.status(200).json({
                        message: "Auth success",
                        user: userObj,
                        token: token
                    })
                }else {
                    res.status(401).json({
                        message: "Auth failed"
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/verifyToken', checkAuth, (req, res, next) => {
    let user = utils.decodeToken(req.body.token);
    return res.status(200).json({
        message: "Auth success",
        userName: user.userName,
        email: user.email,
        userId: user.userId,
    })
});

module.exports = router;