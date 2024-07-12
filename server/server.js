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
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
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
const buildPath = path.join(__dirname, '..', 'build');
console.log('Serving static files from:', buildPath); // Debugging line
app.use(express.static(buildPath, {
  setHeaders: function (res, path) {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  console.log('Sending index.html from:', indexPath); // Debugging line
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
