 var express=require("express");
 var app=express();
 const session=require('express-session');
 var bodyParser = require('body-parser');
 var passport = require('passport');
 var cookieParser=require("cookie-parser");

var  auth = require('./auth');

app.set('view engine', 'ejs');
app.set('views', 'view');
app.use(express.static(__dirname));

app.use(session({key:"suab",secret:"abhi",cookie:({maxAge:null})}))
app.use(bodyParser());
app.use(cookieParser());

auth(passport);
app.use(passport.initialize());
app.use(passport.session());


app.get("/",function(req,res){
  var pagedata={title:"homepage"}
  res.render("home/index",pagedata)
});


app.get('/google', passport.authenticate('google', {


    scope: ['email']

}));
app.get('/login',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {

            res.render("logout/index")
    }
);


app.get('/logout', (req, res) => {
    
    req.logout();
    req.session = null;

    res.redirect('/');
});


app.listen(3000,function(){
	console.log("server")
});