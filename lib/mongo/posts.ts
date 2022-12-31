import mongoose from 'mongoose';

const MODEL_NAME = 'Post';

const PostSchema = new mongoose.Schema({
    title: String,
    date: String,
    hash: String,
    author: String
});

if(process.env.NODE_ENV === 'development') delete mongoose.models[MODEL_NAME];

export default mongoose.model(MODEL_NAME, PostSchema);
