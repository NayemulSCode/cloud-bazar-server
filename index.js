const express = require('express')
const cors = require('cors')
require('dotenv').config()


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})