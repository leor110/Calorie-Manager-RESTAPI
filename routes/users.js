var express = require('express');
var router = express.Router();
const { client } = require('../db');

// GET detailed description of a specific user by their ID
router.get('/:id', async function(req, res, next) {
  try {
    const db = client.db('CaloriesCluster');
    const usersCollection = db.collection('users');

    // Extract the user ID from the URL parameters
    const userId = parseInt(req.params.id);

    // Check if the user exists in the users collection by 'id'
    const user = await usersCollection.findOne({ id: userId });

    // If the user exists, return the detailed user information
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message:  'User not found. Please register the user first.', error });
  }
});

module.exports = router;
