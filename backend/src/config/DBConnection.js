const mongoose = require('mongoose');

const DBConnection = mongoose.connect(
    process.env.MONGO_DB_URI + process.env.MONGO_DB_NAME,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

module.exports = DBConnection;
