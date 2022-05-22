import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokenVersion:{
    type: Number,
    default: 0
  }
})

export default mongoose.model('admins', adminSchema)