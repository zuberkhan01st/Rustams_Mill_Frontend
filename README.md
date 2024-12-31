# Rustam's Mill - Frontend (React Native)

This is the **React Native frontend** for **Rustam's Mill**, providing a mobile application for users to interact with the grinding mill services. The application is designed for a smooth, mobile-first experience on both **Android** and **iOS** platforms.

---

## Demo Screenshots

### Home Screen
![Home Screen](assets/IMG-20241231-WA0003.jpg)

---

### Admin Login Screen
![Admin Login](assets/IMG-20241231-WA0004.jpg)



### Admin Dashboard Screen
![Admin Dashboard](assets/IMG-20241231-WA0005.jpg)

### Booking Screen
![Booking Screen](assets/IMG-20241231-WA0006.jpg)

### Chatbot Screen
![User Dashboard](assets/IMG-20241231-WA0008.jpg)

### Contact Us Screen
![User Dashboard](assets/IMG-20241231-WA0009.jpg)

---

## Features

- **Mobile-first experience** for both **Android** and **iOS** platforms.
- **Booking grinding services**: Users can easily book services through the app.
- **Viewing service history**: Users can track their past orders.
- **Real-time updates** on orders: Notifications for order status and updates.
- **Contacting the mill**: A simple form to get in touch with the mill for inquiries.
- **Smooth navigation**: Users can navigate between different screens with ease.
- **Responsive design**: Optimized for various screen sizes and devices.
- **Integrated with the backend API**: Fetches dynamic data from the backend and displays it in real-time.

---

## Technology Stack

- **React Native**: For cross-platform mobile app development.
- **Expo**: Provides development and build tools for React Native apps.
- **Axios**: Used for making API requests and handling responses.
- **React Navigation**: For navigating between different screens in the app.
- **React Native Maps**: For integrating map functionality (optional, if needed for locating services).
- **React Native Paper**: For consistent and beautiful UI components.
- **React Context or Redux**: For state management (if required).
- **Formik**: For managing forms, like the contact us form.

---

## Project Structure

```plaintext
Rustams_Mill_Frontend/
├── assets/          # Images, fonts, and other static assets
├── src/             # Source files
│   ├── components/  # Reusable UI components
│   ├── screens/     # Individual app screens
│   ├── navigation/  # Navigation configurations
│   ├── styles/      # Styling files
│   └── App.js       # Main application entry point
├── .gitignore       # Files and folders to be ignored by Git
├── package.json     # Project dependencies and scripts
└── README.md        # Documentation for the frontend
