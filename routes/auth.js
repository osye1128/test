const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


router.post('/register_process',(req,res)=>{
    const {email,pwd,nick} =req.body;

    const user={
        email:email,
        pwd:pwd,
        nick:nick,
    }
db.get('users').push(user).write();
    req.login(user,(err)=>{
        res.redirect('/');
})
})

router.post('/login_process',(req,res)=>{
   res.redirect('/main');
});

router.get('/register',(req,res)=>{
    res.render('register');
})

module.exports=router;