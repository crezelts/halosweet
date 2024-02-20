import mongoose from "mongoose";

const connectDB = async () => mongoose.connect("mongodb+srv://cudd:C50OpQtP8O8bgBSH@cluster0.exl9lhe.mongodb.net/")

export default connectDB;