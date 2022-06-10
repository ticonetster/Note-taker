const express = require('express');

const PORT = process.env.PORT || 3002;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

require('./routes/routes')(app);

app.listen(PORT, () =>
  console.log(`App listening on port: ${PORT}`)
);
