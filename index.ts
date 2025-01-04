import express from "express"
import dotenv from "dotenv"
dotenv.config();
const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.wwxy5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const app = express();

app.listen(PORT, () => {

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const gamesCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME);

    collections.games = gamesCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
    console.log(`Server is starting at http://localhost:${PORT}`);
});