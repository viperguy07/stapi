const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    id: String,
    name: String,
});

module.exports = mongoose.model('test', testSchema);