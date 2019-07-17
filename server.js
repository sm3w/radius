const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser')
const records = require('./routes/api/records');

const app = express();

// Body parser mware
app.use(body_parser.json());

// Database config & connection
const mdb = require('./config/keys').mongoURI;

// Mongo DB connection - TODO(jamie): refactor to async/await
mongoose.connect(mdb, { useNewUrlParser: true })
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log(err));

// Set routes
app.use('/api/records', records);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Listening on port ${5000}`));
