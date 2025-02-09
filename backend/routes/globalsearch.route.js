import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';

import { getSearchSuggestions, globalAdminSearch, globalUserSearch } from '../controllers/globalsearch.controller.js';

const router = express.Router()

router.route('/admin/search').post(isAuthenticated, globalAdminSearch)
router.route('/search').post( globalUserSearch)
router.route('/suggestions').get(getSearchSuggestions)

export default router;