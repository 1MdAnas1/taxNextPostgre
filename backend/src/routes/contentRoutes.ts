import { Router } from 'express';

import{ getAllContent, getContentByKey, updateContent, deleteContent } from '../controllers/contentControllers';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';

const router = Router();
router.get('/', getAllContent);
router.get('/:key', getContentByKey);
router.put('/:key', auth, admin, updateContent);
router.delete('/:key', auth, admin, deleteContent);

export default router;
