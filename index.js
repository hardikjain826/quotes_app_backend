require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Quote = require('./models/Quote');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.get('/quote', async (req, res) => {
  try {
    const quote = await Quote.aggregate([{ $sample: { size: 1 } }]);
    res.json(quote[0]);
  } catch (err) {
    res.status(500).send("Error fetching quote");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
