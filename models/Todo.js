const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    uid: {
      type: String,
      required: true,
    },
  })
  module.exports = mongoose.model('Todo',todoSchema);