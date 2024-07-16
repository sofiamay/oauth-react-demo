import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import queryString from 'query-string';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import req from 'express/lib/request';

// example data for DEMO PURPOSES ONLY
import mockDb from './mock-db';
const EXAMPLE_TRANSACTIONS = mockDb.transactions;

/* --- Config --- */

const config = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth', //link to the google auth consent screen
  tokenUrl: 'https://oauth2.googleapis.com/token', //link to very authorization code from front end and get token
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

/* -- Middleware -- */

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

/* -- Routes -- */

// Give the front end the google auth url with params
app.get('/auth/url', (_, res) => {
  res.json({
    url: `${config.authUrl}?${authParams}`,
  });
});

// get an authorization code, verifies it with google
// and sends back a token to the client cookies along with user info
app.get('auth/token', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ message: 'Code is required' });
  try {
    // get params required to get token from google
    const tokenParams = getTokenParams(code);
    // exchange code for token
    const {
      data: { id_token },
    } = await axios.post(`${config.tokenUrl}?${tokenParams}`);
    // 400 error if invalid code
    if (!id_token) return res.status(400).json({ message: 'Invalid auth code' });
    // get user info from id token
    const { name, email, picture } = jwt.decode(id_token);
    const user = { name, email, picture };
    // sign new token
    const token = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });
    // set cookies to sent to user
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: config.tokenExpiration,
    });
    // send user back to client
    res.json({ user });
  } catch (error) {
    // 400 error if invalid code
    console.error('Error: ', error);
    res.status(400).json({ message: 'Invalid auth code' });
  }
});

// returns logged in state along with user info
// also refreshes token
app.get('/auth/logged_in', (req, res) => {
  try {
    //get token from cookie
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    // get user info from token
    const { user } = jwt.verify(token, config.tokenSecret);

    // reset token in cookie 
    const newToken = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: true,
      maxAge: config.tokenExpiration,
    });

    // send user back to client
    res.json({ loggedIn: true, user });
  } catch (error) {
    res.json({ loggedIn: false });
  }
});

// log out user by clearing token
app.post('/auth/logout', (_, res) => {
  res.clearCookie('token');
  res.json({ message: 'Log out success' });
});

// get user transactions (FOR DEMO PURPOSES ONLY)
app.get('/user/transactions', auth, (_, res) => {
  try {
    const transactions = EXAMPLE_TRANSACTIONS;
    res.json({ transactions });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ message: 'Server error' });
  }
});

