var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var session=require("express-session");
var cookieParser=require("cookie-parser")


// app.set("views","view");
app.set("view engine","ejs")
app.use(express.static(__dirname));
// app.use(express.static(__dirname+"/public"));

app.use(bodyparser());
app.use(cookieParser());



app.use(function(req, res, next){
	// console.log(req.cookies);
	
	
	res.locals.cookies=req.cookies.pid;
	next();
});
app.get('/',function(req,res){
	var Greeting = (function () {
   function Greeting() {
   }
   Greeting.prototype.greet = function () {
      
   };
	return Greeting;
}());

var obj = new Greeting();
obj.greet()

    res.sendFile(__dirname+'/views/layout.html');
});

app.use(session({ secret : "TSS", saveUninitialized: true}));

app.use(require("./controller/default"));

app.listen(2000,function(req,res){
    console.log("runing");
});
