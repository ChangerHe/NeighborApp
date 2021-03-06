const express = require('express');

const timeLog = require('./middleware/timeLog')
const neighbor = require('./routes/neighbor')
const { PORT } = require('./constant/index')

const app = express();


app.use(timeLog)
app.use('/neighbor', neighbor);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// app.get('/category_list', (req, res) => {
//   res.send('')
// })

app.listen(PORT, function () {
  console.log(`Client server is succesful running in ${PORT}`);
});