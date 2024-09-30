// index.js
const express = require('express');
const app = express();
const port = 3000;

const auth = (req, res, next) => {
  console.log(req.headers);

  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  
  
  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).send('Authentication required.');
  }

  const base64 = authHeader.split(' ')[1];
  console.log('base64: ',base64);

  const credentials = Buffer.from(base64, 'base64').toString();
  console.log('credentials',credentials);
  const credentialsAuth =  credentials.split(':');
  const user = credentialsAuth[0];
  const pass = credentialsAuth[1];

  const validUsername = 'admin';
  const validPassword = 'password';
whi
  if (user === validUsername && pass === validPassword) {
    return next();
  } else {
    return res.status(403).send('Access denied.');
  }
};

app.use(auth);

app.get('/', (req, res) => {
  res.send('You are authenticated, Congratulations');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
