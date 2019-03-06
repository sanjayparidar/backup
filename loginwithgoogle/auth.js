const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "263713778972-iohocc6ki3h13rh1u6atenqeh3jqrfds.apps.googleusercontent.com",
            clientSecret:"tV_UI2zIlU_7AV4UxPBEqGoe",
            callbackURL:"http://localhost:3000/login"
            

        },
        (req,accessToken, refreshToken, profile, done) => {
            // console.log("hello")
                // console.log(profile)          
            done(null,profile);
        }));
};