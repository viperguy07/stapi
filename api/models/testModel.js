const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    id: String,
    name: String,
});
// create Taable "test2"
module.exports = mongoose.model('test2', testSchema);