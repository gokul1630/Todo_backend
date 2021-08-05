require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const TodoRoute = require('./routes/TodoRoute');
const UserRoute = require('./routes/UserRoute');

app.use(express.json());
const port = process.env.PORT || 1234;
const URL = process.env.MONGO_URL || '';

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
const database = mongoose.connection;

database.once('open', () => {
  console.log('Database Connected');
});

database.on('error', console.error.bind(console, 'Error'));

app.use('/todo', TodoRoute);
app.use('/user', UserRoute);

app.listen(port, () =>
  console.log(`server listening on http://localhost:${port}`)
);
