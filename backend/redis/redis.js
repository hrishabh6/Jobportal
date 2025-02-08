import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'

dotenv.config()

const redis = new Redis({
  url: process.env.REDIS_URL_ENDPOINT,
  token: process.env.REDIS_TOKEN,
})

export default redis