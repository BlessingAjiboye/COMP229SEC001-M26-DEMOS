/*import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { 
//useNewUrlParser: true,
//useCreateIndex: true, 
//useUnifiedTopology: true
 } )
.then(() => {
console.log("Connected to the database!");
})
 
mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})
app.get("/", (req, res) => {
res.json({ message: "Welcome to User application." });
});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
})
*/

import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'
import { MongoClient, ServerApiVersion } from 'mongodb';


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(config.mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
  });

  app.listen(config.port, (err) => { 
    if (err) {
      console.log(err) 
    }
    console.info('Server started on port %s.', config.port) 
  });
}

run();