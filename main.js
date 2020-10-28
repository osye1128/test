const express = require('express');
const session = require('express-session');
const app=express();
const nunjucks = require("nunjucks");
const authRouter = require("./routes/auth");
const pageRouter = require('./routes/page');
const path=require('path');
const bodyParser=require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/auth',authRouter);
app.use('/',pageRouter);


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
  });
  app.use(session({ secret: 'secret', resave: true, saveUninitialized: false }));



  app.use(passport.initialize());
app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log('serializeUser : ',user);
    done(null, user.email);
  });
  
  passport.deserializeUser(function(id, done) {
    
    var user = db.get('users').find({id:id}).value();
    done(null,id,user);
    console.log('deserializeUser : ',user);
  });


  app.post('/auth/login_process',
  passport.authenticate('local', { successRedirect: '/',
  failureRedirect: '/auth/register',
  failureFlash: true }));

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function(email, pwd, done) {
    const user = db.get('users').find({email,pwd,nick}).value();
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(pwd)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }));
    
  

app.listen('3000',()=>{
    console.log('3000번포트')
})