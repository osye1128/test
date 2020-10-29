const express=require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    
    const fsmg=req.flash();
    res.render('login',{feedback:fsmg.error});
})
router.get('/main',(req,res)=>{
    res.render('main');
})


module.exports=router;
