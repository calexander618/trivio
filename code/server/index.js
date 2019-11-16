const express = require('express');
const app = express();
const port = 3000;

const bodyparser = require('body-parser');

const mongurl = 'mongodb://127.0.0.1:27017/sec-auth';
const mongoose = require('mongoose');

// models
const { User } = require('./Model/User');





// 3rd party middleware
app.use(bodyparser.json());         // for easy request parsing

mongoose.connect(mongurl)
    .then(() => 'connected to mongo')
    .catch(error => console.log(error));

// endpoint for user signup
app.post('/api/user/signup', (req, res) => {
    // create user from Model
    const user = new User({
        email: req.body.email, 
        password: req.body.password
    }).save((err, response) => {                // save user into db
        if (err) res.status(400).send(err);
        res.status(200).send(response);
    });
});

// serve static built out angular files
app.use('/', express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));