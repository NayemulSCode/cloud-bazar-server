const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_UPASS}@cluster0.zqmy8.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("cloudBazar").collection("products");
  const ordersCollection = client.db("cloudBazar").collection("orders");

  // create product
  app.post('/addProduct',(req, res) =>{
      const newProduct = req.body;
      productCollection.insertOne(newProduct)
      .then(result =>{
          res.send(result.insertedCount>0)
      })
  })
  //read product 
  app.get('/products', (req, res) =>{
      productCollection.find({})
      .toArray((err, product) =>{
          res.send(product);
      })
  })
  // create order
  app.post('/addOrder',(req, res) =>{
    const order = req.body;
    ordersCollection.insertOne(order)
    .then(result =>{
        res.send(result.insertedCount>0)
    })
  })
  //read order from frontend
  app.get('/orders',(req, res) =>{
    ordersCollection.find({})
    .toArray((err, orders) =>{
        res.send(orders);
        //console.log(orders)
    })
  })

  console.log('db connected!!');
});



app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})