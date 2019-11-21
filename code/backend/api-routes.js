const router = require('express').Router();

const { User } = require('./model/user');

router.get('/', function (req, res) {
    res.json({
        status: 'APIs Functional',
        message: 'Welcome to my BackEnd!',
    });
});

router.route('/user/signup')
    .post(function (req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        }).save((err, response) => { 
            if (err) res.status(400).send(err);
            res.status(200).send(response);
        });
    });

module.exports = router;