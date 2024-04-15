# Express.js To-Do List App

This Express.js application allows users to create to-do lists, add items to them, and delete items as they're completed.

## Description

This application uses Express.js for the server, EJS for templating, and MongoDB for data storage. Users can access the application via a web browser and interact with their to-do lists.

## Features

- Create new to-do lists
- Add items to to-do lists
- Delete items from to-do lists
- Automatically generates a default to-do list for each day
- Customizable to-do lists with unique names

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies using npm:
   ```
   npm install
   ```

## Usage

1. Start the server by running:
   ```
   npm start
   ```
2. Open a web browser and navigate to `http://localhost:3000` to access the application.
3. Use the interface to create, manage, and delete to-do lists and their items.

## Dependencies

- [Express.js](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [EJS](https://ejs.co/): Embedded JavaScript templating.
- [MongoDB](https://www.mongodb.com/): A NoSQL database used for data storage.
- [Mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.

## Routes

- `/`: Renders the homepage with today's to-do list items.
- `/:customListName`: Renders a custom list page or creates a new list if it doesn't exist.
- `/about`: Renders the about page.

## Credits

This project was created by Ruth Stewart

