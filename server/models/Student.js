const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  feesPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Student', StudentSchema); 