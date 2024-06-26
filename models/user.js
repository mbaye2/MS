const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    prenom: String,
    nom: String,
    inscDate: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    profil: {
        type: String,
        require: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);