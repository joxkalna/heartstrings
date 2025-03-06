# Heartstrings Project

## Overview

Heartstrings is a React application designed to help you preserve and cherish your precious memories by uploading and visualizing your JSON chat history. Originally inspired by a heartfelt need to safeguard meaningful conversations, Heartstrings allows users to upload and visualize their JSON chat history in an elegant, interactive interface.

## Inspiration

The idea for Heartstrings came after requesting and accessing Skype chat messages via JSON format. The goal was to create a way to preserve those conversations in a meaningful format, enabling me to revisit and cherish these exchanges in a more personal, interactive way. This is dedicated to my late mom, Maija.

## Features

- **Upload JSON Files**: Upload JSON files containing chat messages.
- **View Conversations**: View conversations in a clean, chat-style layout.
- **Organize Messages**: Organize messages chronologically.
- **Display Usernames**: Display the sender's username or display name.

## Planned Enhancements - TODO

- **Custom Themes/Page**: Allow users to pick colors, fonts, or backgrounds to personalize the experience.
- **Message Highlighting**: Add the option to highlight important messages.
- **Export Chats**: Add a feature to export conversations as PDFs or printable formats.
- **Cloud Backup**: Integrate cloud backup solutions (e.g., Firebase or OneDrive) for secure storage.
- **Search Functionality**: Implement search functionality to find and highlight key messages.
- **Landing Page**: Add a landing page explaining the purpose of the app and providing clear instructions for uploading files and viewing memories.
- **Compatibility Testing**: Test compatibility with different JSON file structures users might upload.
- **Make it more chat type**: Like Skype but more in memory way.

## Project Structure

```
heartstrings
├── public
│   └── index.html        # Main HTML file for the application
├── src
│   ├── App.tsx          # Main application component
│   └── index.tsx        # Entry point of the React application
├── package.json          # npm configuration file
├── tsconfig.json         # TypeScript configuration file
├── webpack.config.js     # Webpack configuration file
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd heartstrings
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npx webpack serve
```

This will launch the application in your default web browser.

## License

This project is licensed under the ISC License.
