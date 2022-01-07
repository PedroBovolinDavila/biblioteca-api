import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/', UserController.findAll);
router.get('/:userId', UserController.findById);

router.post('/new', UserController.new);
router.post('/login', UserController.login);

router.delete('/delete', UserController.delete);

router.put('/update', UserController.update);

export default router;