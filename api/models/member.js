const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fid: String,
    name: String,
    nickname: { type: String, default: null },
    status: { type: Number, default: 1 },
    rank: { type: Number, default: 99 }
});

module.exports = mongoose.model('Member', memberSchema);