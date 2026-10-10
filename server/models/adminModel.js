var mongoose = require('../config/mongoose'); 

var adminSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  privilege: {
    type: String,
    default: 'global'
  },
  stillActive: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: Date
  }
});

var Admin = mongoose.model('admins', adminSchema);
module.exports = Admin

