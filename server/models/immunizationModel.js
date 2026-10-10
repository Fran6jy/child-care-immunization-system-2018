var mongoose = require("../config/mongoose");
var Schema = mongoose.Schema;

var immunizationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  dose: {
    type: Number
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  registeredChid: [{
    type: Schema.Types.ObjectId
  }],
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  title: {
    type: String,
    required: true
  },
  note: {
    type: String,
    trim: true
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String
  }
});

var Immunization = mongoose.model("immunizations", immunizationSchema);
module.exports = Immunization;