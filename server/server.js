import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import queryString from 'query-string';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

/* --- Config --- */

const config = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth', //link to the google auth consent screen
  tokenUrl: 'https://oauth2.googleapis.com/token', //link to very authorization code and  get token
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpiration: 36000,
}

// sent to front end with authUrl
const authParams = queryString.stringify({
  client_id: config.clientId,
  redirect_uri: config.redirectUrl,
  response_type: 'code',
  scope: 'openid profile email',
  access_type: 'offline',
  state: 'standard_oauth',
  prompt: 'consent',
})

// params sent to tokenUrl
const getTokenParams = (code) =>
  queryString.stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUrl,
  })

/* --- End config --- */

const app = express();

/* Middleware */

// CORS
app.use(
  cors({
    origin: [config.clientUrl],
    credentials: true,
  }),
);

// cookie parser
app.use(cookieParser());

// verify auth
const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const user = jwt.verify(token, config.tokenSecret);
    req.user = user;
    return next();
  } catch (error) {
    console.error('Error: ', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};