const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  framework: {
    type: String,
    required: true,
  },
  points: {
    type: String,
    required: true,
  },
});

//Create a collection
const Vote = mongoose.model('Vote', VoteSchema);
module.exports = Vote;
