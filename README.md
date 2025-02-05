# Firebase Real-time Messaging App with Instant Notifications

## Description

This project is a real-time messaging application that uses **Firebase** for both the frontend and backend. It facilitates **instant notifications** and integrates with **Firebase Admin SDK** to manage push notifications for specific roles (e.g., users, admins). The app supports **multiple registration methods** (Gmail, phone number, and normal email) and uses Firebase's real-time database for messaging. Firebase Analytics is employed to track user actions and provide insights.

The backend server uses Firebase Admin SDK to send notifications that can't be directly triggered from the frontend, ensuring seamless and immediate notification delivery, especially for specific roles.

## Features

- **Real-time messaging**: Users can send and receive messages instantly using Firebase's real-time database.
- **Role-based notifications**: Admins and other roles can receive notifications triggered by specific actions.
- **Multi-method authentication**: Supports Gmail, phone number, and email-based user registration using Firebase Authentication.
- **Data analytics**: Uses Firebase Analytics to track user actions and provide insights.
- **Seamless notifications**: Push notifications are delivered using Firebase Admin SDK, even for roles that aren't directly handled on the frontend.

## Technologies Used

- **Firebase**: Real-time database, authentication, notifications, and analytics.
- **Firebase Admin SDK**: For sending notifications from the backend.
- **Node.js**: Backend server for handling Firebase Admin SDK and notifications.
- **Firebase Authentication**: To manage user authentication with Gmail, phone, and email-based registration.
- **Firebase Analytics**: To track user actions and provide data insights.
- **Firebase Realtime Database**: To handle live chats