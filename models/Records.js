const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create schema
/*
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
*/

const RecordSchema = new Schema({

    nacsc_id: {
        type: String,
        required: true
    },
    nacsc_id: {
        type: String,
        required: true
    },
    p_surname: {
        type: String,
        required: true
    },
    p_forename: {
        type: String,
        required: true
    },
    s_surname: {
        type: String,
        required: true
    },
    s_forename: {
        type: String,
        required: true
    },
    co_name: {
        type: String,
        required: true
    },
    p_tel: {
        type: String,
        required: true
    },
    s_tel: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    memb_start: {
        type: String,
        required: true
    },
    waste_lic: {
        type: String,
        required: true
    },
    waste_start: {
        type: String,
        required: true
    },
    ins_start: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },

}, {collection: 'nacsc_members'});

module.exports = Record = mongoose.model('record', RecordSchema);