import { Router } from 'express';
import BookController from '../controllers/BookController';

const router = Router();

router.get('/', BookController.findAll);
router.get('/:bookId', BookController.findById);

router.post('/new', BookController.new);

router.put('/update', BookController.update);

router.delete('/delete', BookController.delete);

export default router;