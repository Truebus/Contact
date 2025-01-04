const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const contactroute = require('./route/contactroute');
const path = require('path');

const app = express();

// Load environment variables from the .env file
dotenv.config();

app.use(express.json());
app.use(cors());

const _dirname = __dirname;
app.use('/uploads',express.static(path.join(_dirname,"uploads")))

// Log the MONGOOSE_URL to check if it's loaded correctly
console.log("MONGOOSE_URL:", process.env.MONGOOSE_URL);

// Connect to MongoDB using the Mongoose URL from environment variables
const mongoose_url = process.env.MONGOOSE_URL;

mongoose.connect(mongoose_url)
  .then(() => {
      console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
      console.error('Error connecting to MongoDB Atlas:', err);
  });

// Routes
app.use('/api/contact', contactroute);

app.listen(2000, () => {
    console.log("Server is running on port 2000...");
});
