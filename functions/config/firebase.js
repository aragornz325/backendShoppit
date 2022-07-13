/* eslint-disable no-undef */
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

//credenciales

initializeApp({
  credential: cert({
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
    projectId: process.env.PROJECT_ID,
  }),
  databaseURL: process.env.DATABASE_URL,
});

const db = getFirestore();
module.exports = { db };
