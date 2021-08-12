require('dotenv').config();
const express = require('express');
const app = express();
const connect = require('./config/database');
const TodoRoute = require('./routes/TodoRoute');
const UserRoute = require('./routes/UserRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 1234;

app.use('/todo', TodoRoute);
app.use('/user', UserRoute);

app.listen(port, async () => {
  await connect();
  console.log(`server listening on http://localhost:${port}`);
});
