const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');
const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err){
           console.error(err);
           next(error); //status 500
        }
        if (info) {
            return res.status(401).send(info.reason);//401: 비인증
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            return res.json(user);
        })
    })(req, res, next);
});

router.post('/', async (req, res, next) => {
    const exUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (exUser) {
        return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword
        });
        res.status(201).send('ok');//201: create complete

    } catch (error) {
        console.error(error);
        next(error); //status 500
    }
});

module.exports = router;
