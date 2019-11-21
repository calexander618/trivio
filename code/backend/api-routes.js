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

router.route('/user/signin')
    .post(function (req, res) {
        User.findOne({
            "username": req.body.username
        }, (err, user) => {
            if (err) throw err;
            if (!user) res.json({
                message: 'Login failed, user not found.'
            });
    
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) return res.status(400).json({
                    message: 'Wrong Password.'
                }).end();
                
                res.status(200).send('Logged in successfully.');
            });
        });
    });

module.exports = router;