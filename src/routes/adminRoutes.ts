import { Router } from 'express';
import AdminController from '../controllers/AdminController';

const router = Router();

router.post('/add', AdminController.new);
router.post('/remove', AdminController.remove);

export default router;