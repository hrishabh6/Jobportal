import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';

import { globalAdminSearch, globalUserSearch } from '../controllers/globalsearch.controller.js';

const router = express.Router()

router.route('/admin/search').post(isAuthenticated, globalAdminSearch)
router.route('/search').post(isAuthenticated, globalUserSearch)

export default router;