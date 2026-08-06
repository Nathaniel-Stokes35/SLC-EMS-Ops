require('dotenv').config(); // Loads environment variables
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const mongodb = require('./data/database');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const GitHubStrategy = require("passport-github2").Strategy;
const { MongoStore } = require('connect-mongo'); // Fixed import layout

const app = express();
const port = process.env.PORT || 3000;

// Check if running on Render production vs your local machine
const isProduction = process.env.NODE_ENV === 'production';

// 2. MIDDLEWARES & PROXY SETTINGS
app.use(bodyParser.json());

if (isProduction) {
  app.set('trust proxy', 1); // Only trust proxy on Render production
}

// 3. UPDATED SESSION CONFIGURATION
app.use(session({
  secret: process.env.SESSION_SECRET || "secret", 
  resave: false,
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL, 
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    // DYNAMIC FIX: Turn off 'secure' on localhost so the login cookie works!
    secure: isProduction,                
    // DYNAMIC FIX: Use 'lax' on localhost so the browser doesn't block the cookie
    sameSite: isProduction ? 'none' : 'lax'             
  }
}));

// 4. PASSPORT INITIALIZATION
app.use(passport.initialize());
app.use(passport.session());

// 5. CORS CONFIGURATION
app.use(cors({
  origin: isProduction ? 'https://cse341-project2-dj7y.onrender.com' : 'http://localhost:3000',
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],  
  credentials: true                                    
}));

// 6. PASSPORT STRATEGY SETTINGS
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// 7. MOUNT MAIN ROUTER (Cleans up route conflicts)
app.use("/", require("./routes/index.js"));

// 8. DATABASE & SERVER START
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and server running on port ${port}`);
    });
  }
});
