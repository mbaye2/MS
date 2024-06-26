const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema({
    Rating: Number,
    Comment: String,
    ratingDate: String,
    participantId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
});

module.exports = mongoose.model("Evaluation", EvaluationSchema);