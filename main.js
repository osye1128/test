const express = require('express');
const app=express();
const nunjucks = require("nunjucks");
const authRouter = require("./routes/auth");
const pageRouter = require('./routes/page');
const path=require('path');
const bodyParser=require('body-parser');
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



app.listen('3000',()=>{
    console.log('3000번포트')
})