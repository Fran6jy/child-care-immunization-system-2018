var mongoose = require("../config/mongoose");
var Schema = mongoose.Schema;

var parentSchema = mongoose.Schema({
  surname: {
    type: String,
    required: true,
    trim: true
  },
  otherNames: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: true,
    trim: true
  },
  mobileNo1: {
    type: String,
    trim: true
  },
  mobileNo2: {
    type: String,
    trim: true
  },
  child: [{
    id: Schema.Types.ObjectId,
    name: String
  }]
});

var Parent = mongoose.model("parents", parentSchema);
module.exports = Parent;