const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection setup with mongoose
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Routes
app.use('/api/users', userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
