import mongoose from "mongoose";
import './graphql';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => console.log(`Successfully connect to mongodb`))
  .catch(error => console.log(error));  