var express=require('express');
var nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'sanjaypatidar402@gmail.com',
    pass: 'Sanjay@96'
  }
});


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.get('/send',function(req,res){
    var mailOptions={
        from:req.query.from,
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
   transporter.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        // res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.send("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});