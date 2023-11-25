# NoteIt - Your Personal Note-Taking App 📝

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Creating Notes](#creating-notes)
  - [Updating and Deleting Notes](#updating-and-deleting-notes)
- [Styling and Theming](#styling-and-theming)
- [Responsive Design](#responsive-design)
- [Backend Setup](#backend-setup)
- [Frontend Development](#frontend-development)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Methodology](#methodology)
  - [Backend Development Workflow](#backend-development-workflow)
  - [Frontend Development Workflow](#frontend-development-workflow)
  - [CSS Styling Workflow](#css-styling-workflow)
  - [Hosting Workflow](#hosting-workflow)
  - [Testing and Corrections](#testing-and-corrections)

## Introduction

NoteIt is a feature-rich personal note-taking application that allows users to organize their thoughts, ideas, and tasks seamlessly. Whether you're a student, professional, or someone who simply loves jotting down thoughts, NoteIt is designed to make your note-taking experience enjoyable and efficient. 🚀

## Features

- **User Authentication:** Secure your notes with user authentication using JSON Web Tokens (JWT). 🔐
- **Note Management:** Create, update, and delete notes effortlessly. 🔄
- **Dynamic Theming:** Personalize your app with a light or dark theme based on your preference. 🎨
- **Responsive Design:** Access NoteIt from any device, as it adapts to different screen sizes. 📱
- **Type-Based Organization:** Categorize your notes with different types such as Study, Personal, Fitness, Finance, and more. 🗂️
- **Intuitive User Interface:** A clean and intuitive UI for a seamless note-taking experience. 🌈

## Technologies Used

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Mongoose)
  - JSON Web Tokens (JWT) for authentication
  - CORS for secure communication

- **Frontend:**
  - React.js
  - Axios for HTTP requests
  - React Router for navigation
  - React Modal for modals

- **Styling:**
  - CSS for styling
  - CSS Variables for dynamic theming

- **Deployment:**
  - Render.com for hosting backend and frontend

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB account for the database (update the connection string in `.env`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Siddhant51/note-it-frontend.git
   git clone https://github.com/Siddhant51/note-it-backend.git
   ```

2. Install backend dependencies:

   ```bash
   cd note-it-backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd note-it-frontend
   npm install
   ```

4. Create a `.env` file in the backend directory and add your MongoDB connection string.

## Usage

### Authentication

- Upon registration, users receive a unique JWT token for authentication.
- Use this token in the headers for authenticated API requests.

### Creating Notes

- Click on the "+" button to create a new note.
- Choose a type and provide a title and content.
- Save your note.

### Updating and Deleting Notes

- Click on a note to open it.
- Edit the title or content.
- Save your changes or delete the note.

## Styling and Theming

- Toggle between light and dark themes.
- The app dynamically adjusts its colors based on the selected theme.

## Responsive Design

- The app is designed to provide a seamless experience on various screen sizes.
- Responsive layout ensures usability on both desktop and mobile devices.

## Backend Setup

- The backend is hosted on Render.com.
- Ensure the backend API URL is correctly configured in the frontend.

## Frontend Development

- The frontend is built using React.js.
- Components are modularized for easy maintenance and reusability.

## API Endpoints

- The backend exposes endpoints for user registration, authentication, note creation, update, deletion, and note count retrieval.

## Deployment

- Both backend and frontend are hosted on Render.com.
- Ensure CORS is configured to allow communication between frontend and backend.

## Contributing

- Contributions are welcome! Fork the repository and submit a pull request. 🤝

## License

- This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to [OpenAI](https://www.openai.com/) for the incredible GPT-3 model that assisted in various aspects of this project. 🙌

## Methodology

### Backend Development Workflow

1. **Setting up the Server:**
   - Initialized a Node.js server using Express.
   - Configured middleware for handling JSON requests and enabling CORS.
   - Connected the server to MongoDB using Mongoose.

2. **Creating Routes:**
   - Defined API routes for user registration, authentication, note creation, updates, and deletions.
   - Implemented route protection using a custom authentication middleware.

3. **Controller Functions:**
   - Developed controller functions to handle business logic for each route.
   - Ensured proper validation and error handling.

4. **Testing with Postman:**
   - Tested each API endpoint using Postman for correctness and reliability.
   - Checked the integration between the server and MongoDB.

5. **Full Backend Functionality:**
   - Integrated all components to ensure the entire backend is fully functional.
   - Verified the registration, login, note creation, and manipulation processes.

### Frontend Development Workflow

1. **Setting up Create-React-App:**
   - Initialized the frontend using Create-React-App for a streamlined project structure.
   - Ensured proper folder organization for components, pages, and assets.

2. **Protected and Local Routes:**
   - Implemented protected routes for authenticated users.
   - Set up local routes for navigation between different sections of the app.

3. **Creating Pages and Components:**
   - Developed core pages (login, register, home) to serve as the main app views.
   - Designed reusable components (modal, topbar, sidebar, create, update) for a modular structure.

4. **Fully Functional App Without Styling:**
   - Ensured the app is fully functional without any styling.
   - Focused on functionality before aesthetics.

### CSS Styling Workflow

1. **Simple External CSS:**
   - Utilized simple external CSS for styling, focusing on clarity and maintainability.
   - Employed CSS classes for consistent styling across components.

2. **CSS Variables for Dynamic Styling and Theming:**
   - Incorporated CSS variables for dynamic theming, allowing users to switch between light and dark modes.
   - Ensured a cohesive and visually appealing design.



3. **Fully Styled App:**
   - Styled each component and page for a polished user interface.
   - Strived for a responsive design to cater to various screen sizes.

### Hosting Workflow

1. **Render.com Setup:**
   - Hosted the frontend as a static website on Render.com.
   - Configured parameters, rules, and environment variables for a smooth deployment.

2. **Web Service for Backend:**
   - Hosted the backend as a web service on Render.com.
   - Specified environment variables and ensured proper configuration.

### Testing and Corrections

1. **Functional Testing:**
   - Conducted thorough testing by interacting with all functionalities on the hosted app.
   - Verified user registration, login, note creation, updates, and deletions.

2. **Bug Identification:**
   - Actively sought out bugs and issues in the deployed app.
   - Checked for any discrepancies between local development and hosted environments.

3. **Bug Corrections:**
   - Addressed and fixed identified bugs promptly.
   - Introduced loading placeholders to manage server latency and enhance the user experience.

