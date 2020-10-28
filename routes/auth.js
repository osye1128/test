const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


router.post('/register',(req,res)=>{
    
    const {email,pwd1,nick} =req.body;

    const user={
        email:email,
        pwd1:pwd1,
        nick:nick,
    }
db.get('users').push(user).write();
req.login(user,(err)=>{
    res.redirect('/');
})

});

router.get('/register',(req,res)=>{
    res.render('register');
})
router.post('/login_process',(req,res)=>{
    res.render('main')
})
module.exports=router;