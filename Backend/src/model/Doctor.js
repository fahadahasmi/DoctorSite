const mongoose = require('mongoose');

const Doctor = mongoose.Schema({
    Name: String,
    Specialization: String,
    Experience: Number,
    Fees: Number,
})

const Doctors = mongoose.model('Doctors', Doctor);
module.exports = Doctors;