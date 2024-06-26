const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    dateRegister: String,
    participantId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
});

module.exports = mongoose.model("Registration", RegistrationSchema);