const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://coderRaj07:H9Ta3ijJ1g5KggRQ@awscrudserverless.aecl4g4.mongodb.net/AWSCRUDserverless", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
