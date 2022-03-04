const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const User = require('./models/User.js');
const Posts = require("./models/Post");
const multer = require("multer");
const dotenv = require("dotenv");


dotenv.config();

mongoose
  .connect(MONGO_URL = process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cookie = require('cookie');

const session = require('express-session');
app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(function(req, res, next){
    console.log(req.session.user)
    let username = (req.session.user) ? req.session.user.username : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
        path : '/', 
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
  next();
});

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

let isAuthenticated = function(req, res, next) {
    if (!req.session.user) return res.status(401).end("access denied");
    next();
};

//////////////////////////
    // SIGN IN/OUT/UP //
//////////////////////////

app.post('/signup/', function (req, res, next) {
    console.log("bye")
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    if (!('email' in req.body)) return res.status(400).end('email is missing');
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    // generate a new salt and hash
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // insert new user into the database
            const newUser = new User({
                username: username,
                email: email,
                password: hash,
            });
            newUser.save((function (error) {
                if (error) {es.status(500).json(error)};
                res.status(200).json(newUser);
            }));
        });
    });
    console.log(username)
    console.log(password)
});

////////////////////////////////////

app.post('/login/', function (req, res, next) {
    console.log("hi")
    // extract data from HTTP request
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    let username = req.body.username;
    let password = req.body.password;
    // retrieve user from the database
    User.findOne({username: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!user) return res.status(401).end("access denied");
        bcrypt.compare(password, user.password, function(err, valid) {
            if (err) return res.status(500).end(err);
            if (!valid) return res.status(401).end("access denied");
            // start a session
           req.session.user = user;
           res.setHeader('Set-Cookie', cookie.serialize('username', user.username , {
                 path : '/', 
                 maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
           }));
           return res.redirect("/");
        });
    });
});

////////////////////////////////////////////

app.get('/signout/', function(req, res, next){
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', null, {
        path: '/',
        maxAge: 0 // expire now
    }));
    return res.end("user has been signed out");    
});

////////////////////////////
         // POST //
///////////////////////////

app.post('/api/posts/', function (req, res, next) {
    const newPost = new Posts(req.body);
    newPost.save((function (error) {
        if (error) {res.status(500).json(error)};
        res.status(200).json(newPost);
    }));
});

///////////////////////////
        // DELETE //
///////////////////////////

app.delete('/api/posts/:id/', function (req, res, next) {
    Posts.findOne({_id: req.params.id}, function(err, item){
        console.log(item)
        if (err) return res.status(500).end(err);
        if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");
        Posts.remove({ _id: item._id }, { multi: false }, function(err, num) {  
            res.json(item);
         });
    });    
});

//////////////////////
      // PUT //
//////////////////////

app.put('/api/posts/:id/', function (req, res, next) {
    const updatePost = new Posts(req.body);
    console.log(updatePost)
    try {
        Posts.findByIdAndUpdate(
          req.params.id,
          {
            updatePost,
          }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
});

////////////////////
      // GET //
////////////////////

app.get('/api/posts/', function (req, res, next) {
    Posts.find({}).sort({createdAt:-1}).limit(15).exec(function(err, items) { 
        if (err) return res.status(500).end(err);
        return res.json(items.reverse());
    });
});

//////////////////////////////////

app.get('/api/posts/:id/', function (req, res, next) {
    Posts.findOne({_id: req.params.id}, function(err, item){
        if (err) return res.status(500).end(err);
        if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");
        return res.json(item);
    });    
});

//////////////////////////////////

app.get('/api/users/user/posts/:userid/', function (req, res, next) {
    Posts.find({username: req.params.userid}, function(err, item){
        if (err) return res.status(500).end(err);
        if (!item) return res.status(404).end("Item id #" + req.params.id + " does not exists");
        return res.json(item);
    });    
});

//////////////////////////////////

app.use(express.static('static'));

const http = require('http');
const PORT = 3050;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});