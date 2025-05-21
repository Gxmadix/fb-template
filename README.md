# Firebase React Template

This project is a template and quick starter for using Firebase with React. It provides a basic setup for authentication, including email/password and Google sign-in options.

## Demo

The application is automatically deployed when changes are merged to the main branch:

- **Firebase Hosting**: [https://your-firebase-project-id.web.app](https://inventory-d27f1.web.app/)

## Features

- Firebase Authentication
- React Router for navigation
- Material UI for styling
- Form handling with react-hook-form

## Getting Started

### Prerequisites

- Node.js and npm installed
- Firebase account and project set up

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Firebase configuration:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     REACT_APP_ENABLE_GOOGLE_LOGIN=true
     ```

### Running the App

Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Usage

- **Login**: Use the login form to sign in with email and password.
- **Register**: Use the register form to create a new account.
- **Reset Password**: Use the reset password form to send a password reset email.
- **Google Login**: If enabled, use the Google login button to sign in with Google.

## Deployment

The application is automatically deployed when changes are merged to the main branch. The deployment is handled by GitHub Actions and can be configured to deploy to either:

- **Firebase Hosting**: in your GitHub repository secrets
- **GitHub Pages**: TODO

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
