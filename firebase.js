const admin = require('firebase-admin');
const path = require('path');

// load service account credentials from environment variable
let serviceAccount;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  // path to a credentials JSON file (not tracked by git)
  const credPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  serviceAccount = require(credPath);
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // JSON string stored in an env var
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (err) {
    throw new Error('Invalid JSON in FIREBASE_SERVICE_ACCOUNT');
  }
} else {
  throw new Error('Firebase service account credentials not provided.\n' +
    'Set GOOGLE_APPLICATION_CREDENTIALS to a filepath or ' +
    'FIREBASE_SERVICE_ACCOUNT to a JSON string.');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = { db };