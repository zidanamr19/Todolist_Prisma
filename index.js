const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.status(200).send({
    status: true,
    message: 'Hello this API from Todolist Prisma and Express',
  });
});

// Routes API
routes(app);

app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
});
