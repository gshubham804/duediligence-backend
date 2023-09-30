const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3005;

// Connect to MongoDB
mongoose.connect('mongodb+srv://duediligenceai:Y0m1IaI13LvvUC8z@cluster0.8qlansh.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
// Allow requests from a specific origin
const corsOptions = {
  origin: 'https://duediligencebot.com', // Replace with your Netlify frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and authorization headers
  optionsSuccessStatus: 204, // No content response for preflight requests
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

// Define routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
