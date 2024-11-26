import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAllJobs, getjobsById, getJobsForRecruiter, postJob } from '../controllers/job.controller.js';
const router = express.Router();

router.route('/post').post(isAuthenticated, postJob)
router.route('/get').get(isAuthenticated, getAllJobs)
router.route('/get/:id').get(isAuthenticated, getjobsById)
router.route('/recruiter/postedjobs').post(isAuthenticated, getJobsForRecruiter)

export default router;