
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // const mongoUri = `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
        const mongoUri = `mongodb+srv://jaswantd4d:EG8MQyMHXXzeTrPe@cluster0.ywouyit.mongodb.net/chatbot?retryWrites=true&w=majority`;
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // optional: exit process on failure
    }
};

module.exports = connectDB;
