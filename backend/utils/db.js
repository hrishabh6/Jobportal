import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to the database');
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectToDatabase;