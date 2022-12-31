import mongoose from 'mongoose';

const MODEL_NAME = 'Project';

const Schema = {
    title: String,
    description: String,
    techStack: Array,
    published_date: Date,
    links: Array
};

const ProjectSchema = new mongoose.Schema(Schema);
if(process.env.NODE_ENV === 'development') delete mongoose.models[MODEL_NAME];
export default mongoose.model(MODEL_NAME, ProjectSchema);
