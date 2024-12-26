import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';

import { globalAdminSearch } from '../controllers/globalsearch.controller.js';

const router = express.Router()

router.route('/admin/search').post(isAuthenticated, globalAdminSearch)

export default router;