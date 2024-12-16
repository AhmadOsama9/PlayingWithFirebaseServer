const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

// initialize the dot env
require('dotenv').config();


// Initialize Express
const app = express();
// app.use(cors());
app.use(bodyParser.json());

const { route } = require('./routes/chat');


const { db } = require("./conf/db");
const messaging = admin.messaging();

// Routes
app.get('/', (req, res) => {
  res.send('Firebase Cloud Messaging Node.js Server');
});



// Subscribe to a channel using FCM token
app.post('/channels/:name/subscribe', async (req, res) => {
  const { name } = req.params;
  const { token } = req.body;

  try {
    const subscriptionRef = db.collection('subscriptions').doc(token);

    // Add the channel to the user's subscriptions
    await subscriptionRef.set(
      { channels: admin.firestore.FieldValue.arrayUnion(name) },
      { merge: true }
    );

    await messaging.subscribeToTopic(token, name);

    res.status(200).send(`Subscribed to channel: ${name}`);
  } catch (error) {
    console.error('Error subscribing to channel:', error);
    res.status(500).send('Error subscribing to channel.');
  }
});

// Unsubscribe from a channel using FCM token
app.post('/channels/:name/unsubscribe', async (req, res) => {
  const { name } = req.params;
  const { token } = req.body;

  try {
    const subscriptionRef = db.collection('subscriptions').doc(token);

    // Remove the channel from the user's subscriptions
    await subscriptionRef.update({
      channels: admin.firestore.FieldValue.arrayRemove(name),
    });
    await messaging.unsubscribeFromTopic(token, name);
    res.status(200).send(`Unsubscribed from channel: ${name}`);
  } catch (error) {
    console.error('Error unsubscribing from channel:', error);
    res.status(500).send('Error unsubscribing from channel.');
  }
});

app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token, // FCM token of the recipient
  };

  try {
    // Send the notification
    await messaging.send(message);
    res.status(200).send("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Error sending notification.");
  }
});


// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
