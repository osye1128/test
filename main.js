const express = require('express');
const session = require('express-session');

const nunjucks = require("nunjucks");
const authRouter = require("./routes/auth");
const pageRouter = require('./routes/page');
const path=require('path');
const bodyParser=require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const app=express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

//lowdb연동
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const flash=require('connect-flash');



app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
  });

  //session
  app.use(session({ secret: 'secret', resave: true, saveUninitialized: false }));

  //connect-flash
  app.use(flash());

  //passport 초기화
app.use(passport.initialize());
app.use(passport.session());


//passport serializeUser, deserializeUser
  passport.serializeUser(function(user, done) {
    console.log('serializeUser : ',user);
    done(null, user.email);
  });
  
  passport.deserializeUser(function(id, done) {
    
    const user = db.get('users').find({id:id}).value();
    done(null,id,user);
    console.log('deserializeUser : ',id);
  });


  //login authenticate
  app.post('/auth/login_process',
  passport.authenticate('local', { successRedirect: '/main',
  failureRedirect: '/',
  failureFlash: true }));

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function(email, pwd, done) {
    
    const user = db.get('users').find({email:email,pwd:pwd}).value();
    
      if(user){
        return done(null, user, {
          message: 'Welcome.'
      });
      }else{
        return done(null,false,{ message: 'Incorrect user information.'})
      }
    }));
    
  
//router settings
    app.use('/auth',authRouter);
    app.use('/',pageRouter);

//port 설정
app.listen('3000',()=>{
    console.log('3000번포트')
})