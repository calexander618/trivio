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
            password: req.body.password,
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            gamesTied: 0,
            friends: []
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
        jwt.verify(bearerHeader, 'secretkey', function (err, authData) {
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

// authentication endpoint
router.route('/user/verifySignin')
    .post(verifyToken, function (req, res) {
        res.status(200).send('signed in').end();
    });

router.route('/user/signin')
    .post(function (req, res) {
        User.findOne({
            "username": req.body.username
        }, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.status(400).json({
                    message: 'Login failed, user not found.'
                }).end();
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) throw err;
                    if (!isMatch) return res.status(400).json({
                        message: 'Wrong Password.'
                    }).end();
                    let token = jwt.sign({
                        user: user
                    }, 'secretkey', (err, token) => {
                        if (err) {
                            res.status(404).send('problem with jwt').end();
                        }
                        res.status(200).json({ token }).end();
                    })

                });
            }

        });
    });

router.route('/user/updateHistory')
    .post(function (req, res) {

        User.findOne({
            "username": req.body.username
        }, (err, user) => {
            if (err) console.log(err);
            let setObject = {
                gamesPlayed: user.gamesPlayed + 1,
            }
            switch (req.body.result) {
                case 'You win!':
                    setObject.gamesWon = user.gamesWon + 1;
                    break;
                case 'You lose!':
                    setObject.gamesLost = user.gamesLost + 1;
                    break;
                case 'You tied!':
                    setObject.gamesTied = user.gamesTied + 1;
                    break;
            }
            User.updateOne({
                "username": req.body.username
            }, {
                $set: setObject
            }, (err, raw) => {
                console.log(err);
            });

            res.status(200).send('updated').end();
        })
    });

router.route('/user/getusers')
    .get(function (req, res) {
        User.find((err, users) => {
            let usersToReturn = users.map(u => {
                return {
                    username: u.username,
                    gamesPlayed: u.gamesPlayed,
                    gamesWon: u.gamesWon,
                    gamesLost: u.gamesLost,
                    gamesTied: u.gamesTied,
                    ratio: u.gamesWon / ((u.gamesPlayed) === 0 ? 1 : (u.gamesPlayed))
                };
            });
            res.status(200).json(usersToReturn).end();
        });
    });

router.route('/user/getuser')
    .get(function (req, res) {
        let playerId = req.query.playerId;
        User.findOne({ username: playerId }, (err, user) => {
            let userToReturn = {
                username: user.username,
                gamesPlayed: user.gamesPlayed,
                gamesWon: user.gamesWon,
                gamesLost: user.gamesLost,
                gamesTied: user.gamesTied,
                ratio: user.gamesWon / ((user.gamesPlayed) === 0 ? 1 : (user.gamesPlayed))
            }
            res.status(200).json(userToReturn).end();
        });
    });

router.route('/user/addFriend')
    .post(function (req, res) {
        User.findOne({ username: req.body.playerId }, (err, user) => {
            if (err) {
                res.status(500).send('error finding user').end();
                return;
            } else {
                if (user.friends.includes(req.body.friend)) {
                    res.status(200).send('friend already added').end();
                    return;
                }
                user.friends.push(req.body.friend);
                User.updateOne({ username: req.body.playerId }, {
                    $set: {
                        friends: user.friends
                    }
                }, (err, raw) => {
                    if (err) {
                        res.status(500).send('error adding friend').end();
                        return;
                    } else {
                        res.status(200).send(`added ${req.body.friend}`).end();
                    }
                });
            }
        });
    });

router.route('/user/removeFriend')
    .post(function (req, res) {
        User.findOne({ username: req.body.playerId }, (err, user) => {
            if (err) {
                res.status(500).send('error finding user').end();
                return;
            } else {
                User.updateOne({ username: req.body.playerId }, {
                    $set: {
                        friends: user.friends.filter(f => f !== req.body.friend)
                    }
                }, (err, raw) => {
                    if (err) {
                        res.status(500).send('error removing friend').end();
                        return;
                    } else {
                        res.status(200).send(`removed ${req.body.friend}`).end();
                    }
                });
            }
        });
    });

router.route('/user/getFriends')
    .get(function (req, res) {
        User.findOne({ username: req.query.playerId }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(404).send('error finding user').end();
                return;
            }
            res.status(200).json(user.friends).end();
        })
    })

module.exports = router;