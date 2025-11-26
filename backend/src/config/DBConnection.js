const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false); // optional: prevent deprecation warning

        const mongoUri = `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

        await mongoose.connect(mongoUri);

        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // Exit process on failure
    }
};

module.exports = connectDB;
