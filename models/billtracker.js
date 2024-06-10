const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billTrackerSchema = new Schema({
    billName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("BillTracker", billTrackerSchema)