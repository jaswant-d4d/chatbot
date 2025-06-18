
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}`;
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // optional: exit process on failure
    }
};

module.exports = connectDB;
