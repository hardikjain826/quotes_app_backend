const mongoose = require('mongoose');
const Quote = require('../models/Quote');

mongoose.set('strictQuery', true);
const connectToDatabase = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    const quote = await Quote.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(quote[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching quote' });
  }
};
