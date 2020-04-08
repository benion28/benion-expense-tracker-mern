const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [
            true,
            "Please Type In Some Text"
        ]
    },
    amount: {
        type: Number,
        required: [
            true,
            "Please Type A Positive Or Negative Number"
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Transaction", TransactionSchema);