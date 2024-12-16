const admin = require('firebase-admin');

// Validate and safely handle environment variables
const initializeFirebaseAdmin = () => {
  // Check if required environment variables exist
  const requiredEnvVars = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_PRIVATE_KEY',
    'FIREBASE_CLIENT_EMAIL'
  ];

  // Validate environment variables
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    throw new Error('Firebase configuration is incomplete');
  }

  // Safely handle private key (add null checks)
  const privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        type: 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: formattedPrivateKey,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        
        // Optional additional credentials
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
        token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token'
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });

    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }
};

// Make sure to call the initialization function
initializeFirebaseAdmin();

// Firestore instance
const db = admin.firestore();

module.exports = { db, admin };