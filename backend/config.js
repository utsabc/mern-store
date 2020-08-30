import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGODB_URL:process.env.MONGODB_URL || 'mongodb://appcluster0-shard-00-02-n1hxz.gcp.mongodb.net',
    JWT_SECRET:process.env.JWT_SECRET || 'default-hikrai'
};