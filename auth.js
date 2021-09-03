import passport from 'passport'; 
import  {Strategy as GoogleStrategy} from   'passport-google-oauth20';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL, 
    passReqToCallback: true, 
  },
  (accessToken, refreshToken, profile, done)  => {
    console.log("Accesstoken 😀",accessToken); 
    console.log("RefreshToken 😁",refreshToken); 
    console.log("Profile 😲😲",profile); 

    //following 3 lines of code creates a new user in User model. 
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(err,profile); 
  }
));

passport.serializeUser((user, done) =>  { 
  done(null,user)
})

passport.deserializeUser((user, done) =>  { 
  done(null,user)
})