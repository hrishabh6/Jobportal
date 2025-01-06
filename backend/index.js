    import cookieParser from 'cookie-parser';
    import cors from 'cors';
    import dotenv from 'dotenv';
    import connectToDatabase from './utils/db.js';
    import userRoute from './routes/user.route.js'; // Assuming you have userRoute in routes folder

    dotenv.config();

    const handler = async (req, res) => {
    // Initialize necessary middleware for serverless function
    cookieParser()(req, res, () => {});
    cors({
        origin: 'https://jobportal-m9p5.vercel.app/', // Allow frontend URL
        credentials: true, // Allow cookies
    })(req, res, () => {});

    // Make sure the database is connected (optional, based on your db connection)
    await connectToDatabase();

    // Handle the request using your existing route handler
    return userRoute(req, res);
    };

    export default handler;
