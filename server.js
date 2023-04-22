const express = require('express');
const app = express();

//in your terminal install cors
//npm install cors
const cors = require('cors');

app.use(express.json({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);
// define routes location
const tempRoutes = require('./routes/api/temperature');

// use routes
app.use('/api/temperature', tempRoutes);

app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('API Running...!!!');
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started  on port ${PORT}`));
