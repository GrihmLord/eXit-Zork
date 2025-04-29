const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost/exitZorkGame', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/game', gameRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
