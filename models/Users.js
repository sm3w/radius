const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UsersSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },


}, {collection: 'users'});

module.exports = Record = mongoose.model('users', UsersSchema);