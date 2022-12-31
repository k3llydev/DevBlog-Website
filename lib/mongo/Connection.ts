import mongoose from 'mongoose';
import axios from 'axios';

if (!process.env.MONGODB_URI) throw new Error('Missing environment variable: "MONGODB_URI"');

export default mongoose.connect(process.env.MONGODB_URI);

export const Serialize = (objectToSerialize: Object | null) => JSON.parse(JSON.stringify(objectToSerialize));

export const fetchContent = (url: string) => axios(url, {
    headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}` // Increments requests limit
    }
}).then(response => response.data).catch(console.error);
