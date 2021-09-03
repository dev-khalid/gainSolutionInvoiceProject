import express from 'express'; 
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
import pdf from 'html-pdf'; 
import passport from 'passport'; 
import  {Strategy as GoogleStrategy} from   'passport-google-oauth20';

dotenv.config(); 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL, 
    passReqToCallback: true, 
  },
  function (accessToken, refreshToken, profile, cb)   {
    console.log("Accesstoken 😀",accessToken); 
    console.log("RefreshToken 😁",refreshToken); 
    console.log("Profile 😲😲",profile); 

    //following 3 lines of code creates a new user in User model. 
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
   return cb(null,profile); 
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((con) => console.log('Connected to Database !')).catch(error => console.log(error))
const app = express(); 
app.use(express.json()); //body parser 


// pdf.create('<h1>something from pdf say hello</h1>').toFile('result.pdf',(err,res)=> { 
//   console.log(err,res.filename); 
// })

app.get('/',(req,res,next) => { 
  res.send('<a href="/auth/google">Sign In with Google </a>'); 
})

app.get('/auth/google',passport.authenticate('google',{scope : ['email','profile'] }) ); 
app.get('/google/callback', passport.authenticate('google',{
  successRedirect: '/protected', 
  failureRedirect: '/auth/failure'
})); 
app.get('/auth/failure', (req,res) => {
  res.send("Something went wrong"); 
})
app.get('/protected', (req,res,next) => { 
  console.log(req.user); 
  res.send('Hello from backend'); 
})
const PORT = process.env.PORT || 5000; 

app.listen(PORT , () => { 
  console.log(`Server is running on port ${PORT}`)
})

//eslint setup 