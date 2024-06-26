const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    type: String,
    sentDate: String,
    message: String,
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
});

module.exports = mongoose.model("Notification", NotificationSchema);