import mongoose from "mongoose";

const connectDB = async () => mongoose.connect("mongodb://localhost:3000/cudd")

export default connectDB;