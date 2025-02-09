import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI_LOCAL;

const connectToDatabase = async () => {
    try {
        console.log(`Connecting to the database: ${MONGODB_URI}`);
        await mongoose.connect(MONGODB_URI, {
            
        });
        console.log(`Connected to the database: ${MONGODB_URI}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectToDatabase;
