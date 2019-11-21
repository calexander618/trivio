const router = require('express').Router();
const jwt = require('jsonwebtoken');

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

// test endpoint that needs jwt verification
function verifyToken(req, res, next) {
    // Get auth header value
    // tokens are sent in header as 'authorization' value
    const bearerHeader = req.headers['authorization'];
    // check if token is defined
    if (typeof bearerHeader !== 'undefined') {
        // verify token is considered signed in
        jwt.verify(bearerHeader, 'secretkey', function(err, authData) {
            if (err) {
                res.status(403).send('forbidden').end();
            } else {
                req.userData = authData.user;
                req.token = bearerHeader;
                next();
            }
        })
    } else {
        res.status(403).send('forbidden').end();
    }
}

// jwt authentication test route
router.route('/protected')
    .post(verifyToken, function (req, res) {
        res.status(200).send('okay it worked').end();
    });


router.route('/user/signin')
    .post(function (req, res) {
        User.findOne({
            "username": req.body.username
        }, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.status(404).json({
                    message: 'Login failed, user not found.'
                }).end();
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) throw err;
                    if (!isMatch) return res.status(400).json({
                        message: 'Wrong Password.'
                    }).end();
                    console.log(user);
                    let token = jwt.sign({
                        user: user
                    }, 'secretkey', (err, token) => {
                        if (err) {
                            res.status(404).send('problem with jwt').end();
                        }
                        res.status(200).json({ token }).end();
                    })

                    // res.status(200).send('Logged in successfully.');
                });
            }

        });
    });

module.exports = router;