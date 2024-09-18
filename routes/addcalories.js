var express = require('express');
var router = express.Router();
const { client } = require('../db');
const { v4: uuidv4 } = require('uuid');

// Route to add a new calorie consumption item
router.post('/', async function (req, res, next) {
    try {
        const db = client.db('CaloriesCluster');
        const usersCollection = db.collection('users');
        const caloriesCollection = db.collection('calories');

        // Check if the user exists in the users collection by 'id'
        const user = await usersCollection.findOne({ id: parseInt(req.body.user_id) });

        if (!user) {
            // If the user doesn't exist, return an error
            return res.status(404).json({ message: 'User not found. Please register the user first.' });
        }

        // Get current date
        const currentDate = new Date();

        // If year, month, or day are not provided in the request body, use current date as default
        const year = req.body.year || currentDate.getFullYear();
        const month = req.body.month || (currentDate.getMonth() + 1); // getMonth() returns 0-based index, so we add 1
        const day = req.body.day || currentDate.getDate();

        // Validate category - accept breakfast, lunch, dinner (case insensitive), default to 'other' if not provided or invalid
        const validCategories = ['breakfast', 'lunch', 'dinner'];
        const categoryInput = req.body.category ? req.body.category.toLowerCase() : 'other'; // Convert to lowercase
        const category = validCategories.includes(categoryInput) ? categoryInput : 'other';

        // Validate amount - must be a positive number between 1 and 2000
        const amount = parseInt(req.body.amount); // Convert the input to a number
        if (isNaN(amount) || amount < 1 || amount > 2000) {
            return res.status(400).json({ message: 'Invalid amount. The value must be a number between 1 and 2000.' });
        }

        // If the user exists, proceed with adding the calorie entry
        const newCalories = {
            id: uuidv4(),
            user_id: req.body.user_id, // Ensure to use the 'id' and not the '_id'
            year: year,
            month: month,
            day: day,
            description: req.body.description,
            category: category,
            amount: amount
        };


        await caloriesCollection.insertOne(newCalories);

        // Return success response
        res.status(200).json({ message: 'Calorie entry added successfully', data: newCalories });

    } catch (error) {
        console.error('Error adding calories:', error);
        res.status(500).json({ message: 'Failed to add calorie entry', error });
    }
});

module.exports = router;
