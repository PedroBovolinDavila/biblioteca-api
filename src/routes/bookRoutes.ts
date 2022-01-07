import { Router } from 'express';
import BookController from '../controllers/BookController';

const router = Router();

router.post('/new', BookController.new);

router.put('/update', BookController.update);

router.delete('/delete', BookController.delete);

export default router;