const BookService = require('../services/BookService');
const formatResponse = require('../utils/formatResponse');
const { Book } = require('../../db/models');

class BookController {
  static async getBooks(req, res) {
    try {
      const book = await BookService.getAllBooks();
      if (book.length === 0)
        return res.json(formatResponse(200, 'Книги не найдено', []));
      return res.json(formatResponse(200, 'Succeess', book));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async createBook(req, res) {
    if (!req.body) return res.status(400).json(formatResponse(400, 'Нет данных'));
    const { title, desc, pages, hasBeenRead, author, picture } = req.body;
    // const { isValid, error } = Book.validate({ title, desc });
    // if (!isValid)
    //   return res.status(400).json(formatResponse(400, 'Ошибка валидации', null, error));
    const { user } = res.locals;
    try {
      const newBook = await BookService.addBook({
        title, desc, pages, hasBeenRead, author, picture, userId: user.id
      });
      return res.status(201).json(formatResponse(201, 'Success', newBook));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async getBookById(req, res) {
    const { id } = req.params;
    try {
      const oneBook = await BookService.getOneBook(id);
      if (!oneBook) return res.status(400).json(formatResponse(400, 'Нет такой книги'));
      return res.json(formatResponse(200, 'Success', oneBook));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async updateBook(req, res) {
    if (!req.body) return res.status(400).json(formatResponse(400, 'Заполните данные'));
    const { title, desc, pages, hasBeenRead, author, picture } = req.body;
    // const { isValid, error } = Book.validate({ title, desc });
    // if (!isValid)
    //   return res.status(400).json(formatResponse(400, 'Ошибка валидации', null, error));
    const { id } = req.params;
    try {
      const updatedBook = await BookService.editBook(
        { title, desc, pages, hasBeenRead, author, picture },
        id,
      );
      if (!updatedBook)
        return res.status(400).json(formatResponse(400, 'Нет книги'));
      return res.json(formatResponse(200, 'Success', updatedBook));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async deleteBook(req, res) {
    const { id } = req.params;
    try {
      const deletedBook = await BookService.deleteOneBook(id);
      if (!deletedBook) return res.json(formatResponse(400, 'Нет книги'));
      return res.status(204).json(formatResponse(204, 'Success'));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }
}

module.exports = BookController;
