require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const GitHubStrategy = require('passport-github2').Strategy;
const { MongoStore } = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(bodyParser.json());

if (isProduction) {
  app.set('trust proxy', 1);
}

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    collectionName: 'sessions'
  }),

  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors({
  origin: isProduction
    ? 'https://slc-ems-ops.onrender.com'
    : 'http://localhost:3000',

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// GitHub OAuth
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.use('/', require('./routes/index.js'));

// Database + Server
mongodb.initDb((err) => {
  if (err) {
    console.error('Database initialization failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and server running on port ${port}`);
    });
  }
});