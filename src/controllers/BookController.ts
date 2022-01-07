import { Request, Response } from 'express';
import Book from '../models/Book';

class BookController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {

      const books = await Book.find();

      return res.status(200).json(books);

    } catch (err) {
      return res.status(500).json(err);
    }
  }

  public async findById(req: Request, res: Response) {
    const { bookId } = req.params;

    try {

      const book = await Book.findById(bookId);

      return res.status(200).json(book);

    } catch (err) {
      return res.status(500).json(err);
    }
  }

  public async new(req: Request, res: Response): Promise<Response> {
    const { name, author, desc, buyLink } = req.body;

    const verifyBook = await Book.findOne({ name });

    if (verifyBook) {
      return res.status(401).send();
    }

    try {

      const book = await Book.create({
        name,
        author,
        desc: desc ? desc : 'Sem descrição disponivel',
        buyLink
      });

      return res.status(200).json(book);

    } catch (err) {
      return res.status(400).json(err);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { bookId, name, author, desc, buyLink } = req.body;

    try {

      const updatedBook = await Book.findByIdAndUpdate(bookId, {
        name,
        author,
        desc: desc ? desc : 'Sem descrição disponivel',
        buyLink
      });

      return res.status(200).json(updatedBook);

    } catch (err) {
      return res.status(400).json(err);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { bookId } = req.body;

    try {

      const deletedBook = await Book.findByIdAndDelete(bookId);

      return res.status(200).json(deletedBook);

    } catch (err) {
      return res.status(400).json(err);
    }
  }


}

export default new BookController();