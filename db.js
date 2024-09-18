const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://shayshov:27JPWyrBHd4EnhAy@caloriescluster.e2zur.mongodb.net/?retryWrites=true&w=majority&appName=CaloriesCluster";

const client = new MongoClient(uri);

// the connction to the DB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connectToDatabase, client };
