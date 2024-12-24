import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { deleteJob, getAllJobs, getJobForAParticularCompany, getjobsById, getJobsForRecruiter, postJob } from '../controllers/job.controller.js';
const router = express.Router();

router.route('/post').post(isAuthenticated, postJob)
router.route('/get').get(getAllJobs)
router.route('/get/:id').get( getjobsById)
router.route('/delete/:id').get(isAuthenticated, deleteJob)
router.route('/recruiter/postedjobs').post(isAuthenticated, getJobsForRecruiter)
router.route('/recruiter/jobbycompany/:id').get(isAuthenticated, getJobForAParticularCompany)

export default router;  