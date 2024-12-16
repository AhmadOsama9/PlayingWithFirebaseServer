const { db } = require("../conf/db");

async function isSubscribed(token, channelName) {
    try {
      const subscriptionDoc = await db.collection('subscriptions').doc(token).get();
      if (subscriptionDoc.exists) {
        const data = subscriptionDoc.data();
        return data.channels.includes(channelName);
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  }

  
module.exports = isSubscribed;