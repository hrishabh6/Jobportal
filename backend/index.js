import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './utils/db.js';
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationsRoute from './routes/application.route.js'
import globalsearchRoute from './routes/globalsearch.route.js'
dotenv.config({})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173', // Allow the deployed frontend origin 
    credentials: true, // Allow credentials (cookies, authorization headers)
}));

const PORT = process.env.PORT || 3000
app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/jobs', jobRoute)
app.use('/api/v1/application', applicationsRoute)
app.use('/api/v1/globalsearch', globalsearchRoute)

app.listen(PORT, () => {
    connectToDatabase()
    console.log(`Server is running on port ${PORT}`)
})