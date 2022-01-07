import { Router } from 'express';
import UserController from '../controllers/UserController';
import BookController from '../controllers/BookController';

const router = Router();

router.get('/', UserController.findAll);
router.get('/:userId', UserController.findById);

router.get('/books/all', BookController.findAll);
router.get('/books/:bookId', BookController.findById);

router.post('/new', UserController.new);
router.post('/login', UserController.login);

router.delete('/delete', UserController.delete);

router.put('/update', UserController.update);

export default router;