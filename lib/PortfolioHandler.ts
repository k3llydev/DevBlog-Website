import MongooseClient, { Serialize } from './mongo/Connection';
import Project from './mongo/projects';

export const listPortfolioProjects = async () => {
    await MongooseClient;
    return Serialize(await Project.find({}).sort('-published_date'));
};
