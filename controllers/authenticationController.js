const jwt = require('jsonwebtoken');
const Warden = require('../models/Warden'); // Import the User model you defined
const mongoose = require('mongoose')
async function authenticateUser(req, res) {
    try {
        const { id, password } = req.body;
        console.log('MongoDB Connection Status:', mongoose.connection.readyState);
        console.log(`Attempting authentication for id: ${id}`);
        const user = await Warden.findOne({id})
        // res.send(user)
        // Temporary hardcoded user
        // const user = { id: 'user1', password: 'password1' };
        // if (!user || user.length === 0) {
        //     console.log('No users found in the collection');
        //     return res.status(401).json({ message: 'Authentication failed' });
        // }

        if (!user) {
            console.log(`Authentication failed for id: ${id}`);
            return res.status(401).json({ message: 'Authentication failed' });
        }
        
        // Validate the password here
        if (user.password !== password) {
            console.log(`Authentication failed for id: ${id} (incorrect password)`);
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ id: user.id }, 'secret_key');
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    authenticateUser,
};
