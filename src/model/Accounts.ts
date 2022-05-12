import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  tokenVersion:{
    type: Number,
    default: 0
  }
})

export default mongoose.model('accounts', accountSchema)