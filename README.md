# Next.js 13 Application

Welcome to the Next.js 13 application hosted at [https://threads-ui.vercel.app](https://threads-ui.vercel.app). This application was built using Next.js 13, TypeScript, Tailwind CSS, React Hook Form, and Clerk for authentication. This readme will provide an overview of the application and instructions on how to get started.

## Overview

### Features
- **Authentication**: The application uses Clerk for user authentication, allowing users to sign up and log in securely.

- **Thread Creation**: Users can create new threads, post messages, and engage in discussions.

- **Responsive Design**: The application is designed to work on various screen sizes, ensuring a seamless user experience on both desktop and mobile devices.

### Technologies Used
- **Next.js**: A React framework for building server-rendered web applications.

- **TypeScript**: A statically typed superset of JavaScript for improved code quality and development experience.

- **Tailwind CSS**: A utility-first CSS framework for fast and responsive web development.

- **React Hook Form**: A library for managing forms in React applications.

- **Clerk**: An authentication and user management platform that simplifies the authentication process.

## Getting Started

To run this application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/threads-ui.git

2. **Install Dependencies:**:
   ```bash
   cd threads-ui
   npm install

3. **Create a `.env.local` file and generate the following environment variables**:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=s
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=
   MONGODB_URL=

4. **Run the Application**:
   ```bash
   npm run dev
5. **Open in Your Browser**:
   
   Open your web browser and navigate to http://localhost:3000 to see the application running locally.
