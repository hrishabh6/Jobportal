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
import path from 'path';
dotenv.config({})

const app = express()

const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


const PORT = process.env.PORT || 3000
app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/jobs', jobRoute)
app.use('/api/v1/application', applicationsRoute)
app.use('/api/v1/globalsearch', globalsearchRoute)

app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
})
app.listen(PORT, () => {
    connectToDatabase()
    console.log(`Server is running on port ${PORT}`)
})
