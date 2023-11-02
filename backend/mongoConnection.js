import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://susanchapas39:${process.env.PASSWORD}@cluster0.6dtg4s3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.on("connectionReady", () => {
  console.log("database client connected")
})

await client.connect();

const db = client.db("apex_accounts");
const accounts = db.collection("accounts")

export default accounts