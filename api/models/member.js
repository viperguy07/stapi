const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fid: String,
    name: String,
    gtag: String,
    status: String,
    rank: Number
});

module.exports = mongoose.model('Member', memberSchema);