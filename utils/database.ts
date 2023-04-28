import { MongoClient } from "mongodb";
const url = `mongodb+srv://admin:${process.env.REACT_APP_DB_USER_PW}@surplus05.cxtuhwu.mongodb.net/?retryWrites=true&w=majority`;

let connectDB: Promise<MongoClient>;
connectDB = new MongoClient(url).connect();
export { connectDB };
