var jwt=require("jsonwebtoken");

 module.exports.verifyToken=function(req,res,next){
	var bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader!=='undefined'){
     var token=bearerHeader.split(' ')[1];
     req.token=token;

    }else{
    	res.status(403);
    	
    }
   next();
}