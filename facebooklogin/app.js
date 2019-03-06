var express           =     require('express')
  , passport          =     require('passport')
  , util              =     require('util')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
  , config            =     require('./config/config')
  , app               =     express();
  
//Define MySQL parameter in Config.js file.

//Connect to Database only if Config.js parameter is set.

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile)
    
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      return done(null, profile);
    });
  }
));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
//Router code
app.get('/', ensureAuthenticated, function(req, res){
    var p=JSON.parse(req.user._raw)
  res.render('index', { user: p });
});
app.get('/account', ensureAuthenticated, function(req, res){

  res.render('account', { user: req.user });
});
//Passport Router
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/login',
  passport.authenticate('facebook', { 
        
       failureRedirect: '/login' 
  }),
  function(req, res) {
     
      

    res.redirect('/');
  });
app.get('/#_=_/logout', function(req, res){
  console.log("#_=_")
  req.logout();
  res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(3000,function(){
  console.log("server")
});