const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            writeConcern: { w: 'majority' }
        });
        console.log("Connected to DB");
    } catch (err) {
        console.error("An error occurred while connecting to the DB:", err.message);
    }
};

module.exports = { connectDB, db: mongoose }





//const db = mongoose.connection;

// Event handlers for database connection
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.once('open', () => {
//  console.log('Connected to MongoDB');
//});