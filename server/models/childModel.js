var mongoose = require("../config/mongoose");
var Schema = mongoose.Schema;

var childSchema = mongoose.Schema({
  surname: {
    type: String,
    required: true
  },
  otherNames: {
    type: String,
    required: true
  },
  dob: {
    type: String
  },
  parentID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  recieved: [{
    type: Schema.Types.ObjectId
  }],
  bloodGroup: {
    type: String,
    required: true
  },
  genotype: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  }
});

var Child = mongoose.model("kids", childSchema);
module.exports = Child;