const mongoose = require('mongoose');
const Warden = require('../models/Warden'); // Import the User model you defined

async function main() {
  try {
    // Connect to your MongoDB database
    await mongoose.connect("mongodb+srv://coderRaj07:H9Ta3ijJ1g5KggRQ@awscrudserverless.aecl4g4.mongodb.net", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Remove all existing users from the User collection
    await Warden.deleteMany({});
    console.log('All existing users deleted successfully');

    // Create an array of demo users
    const demoUsers = [
      { id: 'user1', password: 'password1' },
      { id: 'user2', password: 'password2' },
      { id: 'user3', password: 'password3' },
    ];
    
    // Insert the demo users into the database
    await Warden.insertMany(demoUsers);
    console.log('Demo users inserted successfully');
     const data = await Warden.find({});
     console.log(data)
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

main();

