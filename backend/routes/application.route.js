import express from 'express';

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyForJob, getApplications, getApplliedJobs, updateApplicationStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route('/apply/:id').get(isAuthenticated, applyForJob)
router.route('/get').get(isAuthenticated, getApplliedJobs)
router.route('/:id/applicants').get(isAuthenticated, getApplications)
router.route('/status/:id/update').post(isAuthenticated, updateApplicationStatus)

export default router;