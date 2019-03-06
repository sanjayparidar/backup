var express=require("express");
var app=express();

var bodyparser=require("body-parser");
var jwt=require("jsonwebtoken");

app.post("/",verifyToken,function(req,res){
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
app.post("/login",function(req,res){
	var user={username:"sanjay",password:"123"}
	});

app.get('/user',(req,res)=>{
	jwt.sign({user:"abhi"},"suab",(err,token)=>{
		if(err)
			res.status(400).json("err");
		else
				res.status(200).json(token)
	});
});

function verifyToken(req,res,next){
	var bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader!=='undefined'){
     var token=bearerHeader.split(' ')[1];
     req.token=token;

    }else{
    	res.status(403);
    	
    }
    next();
}
app.listen(3000,function(){
	console.log("server")
});
