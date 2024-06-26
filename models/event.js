const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: String,
    description: String,
    date: String,
    place: String,
    capacity: Number,
    createdAt: String,
    organizerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Event", EventSchema);