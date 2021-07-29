const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express');
const cors = require('cors');
const { database } = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert('./cred.json'),
    databaseURL: 'https://don-pisto.firebaseio.com'
});

const app = express();

app.use(cors({ origin: true }));

app.get('/hello-world', (req, res) => {
    return res.status(200).json({ message: 'HELLO WOLRD' })
});

app.use(require('./routes/products.routes'));

exports.app = functions.https.onRequest(app);
