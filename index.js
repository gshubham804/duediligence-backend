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
app.options('/*', (_, res) => {
  res.sendStatus(200);
});

// CORS configuration with additional headers
const corsOptions = {
  origin: '*', // Update to match the domain you will make the request from
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

app.use(cors(corsOptions));

// Define routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
