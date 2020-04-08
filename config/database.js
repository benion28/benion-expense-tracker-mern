const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected Successfully: ${ connect.connection.host }`.cyan.underline.bold);
    } catch (error) {
        console.log(`Error: ${ error.message }`);
        process.exit(1);
    }
};

module.exports = connectDatabase;