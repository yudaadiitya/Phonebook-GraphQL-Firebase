const mongoose = require('mongoose');

const pbSchema = new mongoose.Schema({
    id: Number,
    name: String,
    phone: String
})


module.exports = mongoose.model('Phonebook', pbSchema);