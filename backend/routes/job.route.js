import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { deleteJob, getAllJobs, getJobForAParticularCompany, getjobsById, getJobsForRecruiter, jobStatus, postJob } from '../controllers/job.controller.js';
const router = express.Router();

router.route('/post').post(isAuthenticated, postJob)
router.route('/get').post(getAllJobs)
router.route('/get/:id').get( getjobsById)
router.route('/updateStatus/:id').post(isAuthenticated, jobStatus)
router.route('/delete/:id').get(isAuthenticated, deleteJob)
router.route('/recruiter/postedjobs').get(isAuthenticated, getJobsForRecruiter)
router.route('/recruiter/jobbycompany/:id').get(isAuthenticated, getJobForAParticularCompany)

export default router;  