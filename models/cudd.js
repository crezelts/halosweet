import { Schema, model, models } from 'mongoose';

const cuddSchema = new Schema({
    email: String,
    password: String
});

const cudd = models.cudd || model("cudd",cuddSchema);

export default cudd;