# Task Management Application

## Overview

This project is a work tracking application that integrates real-time chat functionality with task management. Built with Express, Socket.io, and MongoDB, the application allows users to track tasks, manage their statuses, and engage in real-time conversations.

## Video Demo

[![Video Demo](https://img.youtube.com/vi/b2Jvj5k737I/0.jpg)](https://youtu.be/b2Jvj5k737I)

## Features

- **Task Management:** Add, view, update, and delete tasks with various attributes including title, description, status, assigned user, and deadline.
- **Real-Time Chat:** Communicate with others in real-time using Socket.io, with chat history displayed dynamically.
- **User Identification:** Unique usernames are generated for each user connecting to the chat.
- **Data Visualization:** View and interact with a data log from MongoDB through an integrated button.

## Technologies Used

- **Express:** A minimal and flexible Node.js web application framework.
- **Socket.io:** Enables real-time, bidirectional communication between clients and the server.
- **MongoDB:** A NoSQL database used to store messages and tasks.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **TailwindCSS:** A utility-first CSS framework used for styling the frontend.

## Setup

### Prerequisites

- Node.js and npm installed
- A MongoDB Atlas account and cluster

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/Socket-MongoDB-Work-Tracker.git
cd Socket-MongoDB-Work-Tracker
```

2. **Install Dependencies**

  ``` bash
  Copy code
  npm install
  Configure MongoDB
  ```

Update the MongoDB connection string in server.js with your own MongoDB Atlas connection string.

3. **Run the Application**

  ``` bash
  Copy code
  npm start
  Open in Browser
  ```

Navigate to http://localhost:3000 in your web browser.

## Usage

- **Adding a Task:** Use the form on the sidebar to input task details and submit.

- **Managing Tasks:** View tasks in the sidebar and interact with them as needed.

- **Real-Time Chat:** Use the chat input at the bottom to send and receive messages instantly.

- **Viewing Data Log:** Click the "Data Log" button to open the MongoDB data log in your browser.

## Troubleshooting

If the application does not work as expected:

Ensure MongoDB Atlas connection details are correct and the database is accessible. <br>
Verify that all dependencies are installed correctly. <br>
Check the browser console and server logs for any error messages and debug accordingly. <br>

## Contributing 

Feel free to submit issues or pull requests if you encounter bugs or have suggestions for improvements.

## License

Credit to Dharmarajsinh Jethva for basis of code, see Codedex.com for more information. <br> 
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact ft.alxx@gmail.com.

## Customizations

In the index.html file:

Background: A complex multi-layered background with gradients for a visually appealing interface. <br>
Text Positioning: The "Data Log" button is positioned at the bottom-right corner for easy access. <br>

In the script.js file:

Chat Functionality: Includes logic for sending and receiving messages and updating the chat window. <br>
Task Management: Handles task creation, fetching, and rendering in the sidebar.
