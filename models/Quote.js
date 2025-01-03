const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  quote_text: { type: String, required: true },
  author: { type: String, default: "Unknown" },
});

module.exports = mongoose.model('Quote', quoteSchema);
