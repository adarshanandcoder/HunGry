const mongoose = require('mongoose');
require('dotenv').config();

// Define your MongoDB connection string
const mongoDB = async () => {
  try {
    // Establish MongoDB connection
    let mongoUrl = process.env.MONGO_URL 
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,    // Optional
      useUnifiedTopology: true, // Optional
    });
    console.log('MongoDB connected successfully');
    const db = mongoose.connection.db;

    // Fetching data from the first collection
    const fetched_data = await db.collection('Khana_options').find({}).toArray();
    global.food_items = fetched_data;

    // Fetching food categories from the second collection
    const foodCategory = await db.collection("Khana_type").find({}).toArray();
    global.food_categories = foodCategory;


  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = mongoDB;



