const express = require('express');
const isSubscribed = require('../helper/isSubscribed');
const admin = require('firebase-admin');

const router = express.Router();




router.post('/channels/:name/messages', async (req, res) => {
    const { name } = req.params;
    const { token, message } = req.body;
  
    try {
      // Check if the user is subscribed to the channel
      const subscribed = await isSubscribed(token, name);
      if (!subscribed) {
        return res.status(403).send('User not subscribed to this channel');
      }
  
      // Initialize Firebase Realtime Database
      const channelRef = admin.database().ref(`channels/${name}/messages`);
  
      // Create a new message object
      const newMessage = {
        text: message,
        timestamp: Date.now(),
        sender: token, // Assuming token represents the user
      };
  
      // Push message to the channel's messages list
      await channelRef.push(newMessage);
  
      res.status(200).send('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    }
});


// Get messages from a channel with pagination
router.get('/channels/:name/messages', async (req, res) => {
    const { name } = req.params;
    const { lastMessageId } = req.query; // Optional: the ID of the last message fetched for pagination
  
    try {

      // const subscribed = await isSubscribed(token, name);

      // Initialize Firebase Realtime Database
      const channelRef = admin.database().ref(`channels/${name}/messages`);
  
      // Prepare the query for pagination
      let query = channelRef.orderByKey().limitToLast(10); // Limit to 10 messages per page
  
      if (lastMessageId) {
        query = query.endAt(lastMessageId); // Get messages before the last message fetched
      }
  
      const snapshot = await query.once('value');
      const messages = snapshot.val() || {};
  
      // Convert the messages to an array and return
      const messageList = Object.keys(messages).map((key) => ({
        id: key,
        ...messages[key],
      }));
  
      res.status(200).json(messageList);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).send('Error fetching messages');
    }
});
  



module.exports = router;