var express=require("express");
var app=express();

var bodyparser=require("body-parser");
var jwt=require("jsonwebtoken");
var verifytoken=require("./helper/verifytoken");

app.post("/",verifytoken.verifyToken,function(req,res){
	jwt.verify(req.token,'suab',(err,authdata)=>{
		if(authdata){
			res.json({
		message:"post is creat"});
		}
		else{
			res.status(400).json("no token given")
		}
	});
	
});


app.get('/user',(req,res)=>{
	jwt.sign({user:"abhi"},"suab",(err,token)=>{
		if(err)
			res.status(400).json("err");
		else
				res.status(200).json(token)
	});
});
 
app.listen(3000,function(){
	console.log("server");
});
