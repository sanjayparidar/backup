var express=require("express");
var router=express.Router();


// router.get("/",function(req,res){
// 	var pagedata={title:"loginpage",pagename:"login/index"};
// 	res.render("layout",pagedata);
// })


router.post("/",function(req,res){
    var time = 1000*60*60*24;
   var email=req.body;
   // console.log(req.body)
   res.cookie('pid', email , { expires: new Date(Date.now() + time), httpOnly: true })

   res.redirect("/about")
});



module.exports=router;