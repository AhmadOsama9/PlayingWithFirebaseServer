# Firebase Real-time Messaging App with Instant Notifications

## Description

This project is a real-time messaging application with a server backend that facilitates **instant notifications** and integrates with **Firebase Admin** to manage push notifications for specific roles (e.g., users, admins). The app supports **multiple registration methods** (Gmail, phone number, and normal email) and leverages Firebase's real-time database for messaging and data analytics for tracking user actions.

The backend server manages notifications that can't be sent directly from the frontend by utilizing Firebase's admin SDK. This ensures seamless and immediate delivery of notifications, especially for specific roles.

## Features

- **Real-time messaging**: Users can send and receive messages instantly.
- **Role-based notifications**: Admins and other roles can receive notifications triggered by specific actions.
- **Multi-method authentication**: Support for Gmail, phone number, and email-based user registration.
- **Data analytics**: Uses Firebase Analytics to track user actions and provide insights.
- **Seamless notifications**: Push notifications are delivered using Firebase Admin SDK, even for roles that aren't directly handled on the frontend.

## Technologies Used

- **Firebase**: Real-time database, authentication, notifications, and analytics.
- **Node.js**: Backend server for handling Firebase Admin SDK and real-time messaging.
- **Express.js**: Web framework to build the API endpoints for messaging and notifications.
- **Socket.io**: For real-time communication between the frontend and backend.
- **Firebase Admin SDK**: For sending notifications from the backend.
- **JWT (JSON Web Tokens)**: For secure authentication and role management.