var express=require("express");
var app=express();
var async = require("async");


var bodyparser=require("body-parser");
var nodemailer = require('nodemailer');
var cron = require("node-cron");
 var fs = require("fs");
 var user = require("./model/user");

app.use(bodyparser());

app.get("/",function(req,res){
  // var today = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2);
  // console.log(today)
  // var time=new Date().getHours()+':'+("0"+new Date().getMinutes()).slice(-2);
  //   console.log(time)
 
 //  var date = Date.now();
 // var date= date.toString();
 //  console.log(date)



  // console.log(date)

	res.sendFile(__dirname+"/views/index.html")
});
app.post("/login",function(req,res){ 

  user.insert(req.body, function(err, result){
    console.log(result);
    res.redirect("/");
  });
    
})

cron.schedule("* * * * *", function() {
   var today = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2);
  // console.log(today)
  var time=new Date().getHours()+':'+("0"+new Date().getMinutes()).slice(-2);
    // console.log(time)

   //  var today="2019-01-21"
   // var time="06:02"


    user.findWhere({ $and: [ { date: today }, { time:time} ] }, function(err, result){
  

     if(result.length>0){
        var emails=result.map(i=>{
          //console.log(i.email);
          return i.email
        })
    console.log(emails)
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanjaypatidar402@gmail.com',
    pass: 'Sanjay@96'
  }
});

var mailOptions = {
    from: "sanjaypatidar402@gmail.com", // sender address
    subject: "Hello ✔", // Subject line
     // plaintext body
   // html body
}

var toEmail = emails;
// send mail with defined transport object
async.forEachLimit(toEmail,1,function(email,callback){
    mailOptions["to"] = email;

    //manipulate the text
    mailOptions["text"] = "Hi- your appoiment is now"

    transporter.sendMail(mailOptions, function(error, response){
      console.log(response)
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.response);
        }
        callback();
    });
 });


     


     }


 });      
      
    });
//     });


app.listen(2000,function(){
	console.log("server")
})