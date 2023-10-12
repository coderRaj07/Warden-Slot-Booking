const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authenticateUser = require('./middleware/authenticateUser');
const Warden = require('./models/Warden')
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://coderRaj07:H9Ta3ijJ1g5KggRQ@awscrudserverless.aecl4g4.mongodb.net/AWSCRUDserverless', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
//Demo check DB
// Define a route for the root URL ("/") to retrieve all wardens
app.get('/', (req, res) => {
  // Assuming 'Warden' is your Mongoose model
  Warden.find({})
    .then((wardens) => {
      // Handle the successful query, e.g., send the wardens as a JSON response
      res.json({ wardens });
    })
    .catch((err) => {
      // Handle the error, e.g., send an error response
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
