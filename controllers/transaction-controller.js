const Transaction = require("../models/Transaction");

// @desc Get All Transactions
// route GET /api/transactions-route
// @access Public
exports.getTransactions = async (request, response, next) => {
    try {
        const transactions = await Transaction.find();
        return response.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
};


// @desc Add A Transaction
// route POST /api/transactions-route
// @access Public
exports.addTransaction = async (request, response, next) => {
    try {
        const { text, amount } = request.body;
        const transaction = await Transaction.create(request.body);
        return response.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(value => value.message);
            return response.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return response.status(500).json({
                success: false,
                error: "Server Error"
            });
        }
    }
};


// @desc Delete A Transaction
// route DELETE /api/transactions-route/:id
// @access Public
exports.deleteTransaction = async (request, response, next) => {
    try {
        const transaction = await Transaction.findById(request.params.id);
        if (!transaction) {
            return response.status(404).json({
                success: false,
                error: "Transaction Not Found"
            });
        }
        await transaction.remove();
        return response.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
};