const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;
const { User } = require('./Model/User');

const mongurl = 'mongodb://127.0.0.1:27017/sec-auth';

mongoose.connect(mongurl)
    .then(() => 'connected to mongo')
    .catch(error => console.log(error));

app.use(bodyparser.json());

app.post('/api/user/signup', (req, res) => {
    const user = new User({
        email: req.body.email, 
        password: req.body.password
    }).save((err, response) => {
        if (err) res.status(400).send(err);
        res.status(200).send(response);
    });
});

app.use('/', express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));