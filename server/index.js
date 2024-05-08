const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Server declaration
const app = express();

// Connect to database
connectDB();

// Cors
app.use(cors());

// Middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}));

// Start the server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
