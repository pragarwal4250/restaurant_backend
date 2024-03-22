const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MongoClient, ServerApiVersion} = require('mongodb');

const dishRoutes = require('./src/routes/dishes')

const app = express();
const PORT = process.env.PORT || 3000;

const data = fs.readFileSync('secrets.json');
const credentials = JSON.parse(data);

// Extract username and password from the JSON
const { username, password } = credentials;

const uri = `mongodb+srv://${username}:${password}@cluster0.qgumum5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// Function to establish connection and return the client
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

// Middleware function
function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call the next middleware function in the stack
}

app.use(cors());
app.use(loggerMiddleware)
app.use(express.json());
app.use(dishRoutes);

app.listen(3000, () => {
    console.log("Server is running...");
});

console.log('Exiting')