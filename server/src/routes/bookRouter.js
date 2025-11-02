const express = require('express');
const BookController = require('../controllers/BookController');
const isValidateId = require('../middlewares/isValidateId');
const { verifyRefreshToken } = require('../middlewares/verifyTokens');

const bookRouter = express.Router();

bookRouter.get('/', BookController.getBooks);

bookRouter.post('/', verifyRefreshToken, BookController.createBook);

bookRouter.get('/:id', isValidateId, BookController.getBookById);

bookRouter.put('/:id', isValidateId, BookController.updateBook);

bookRouter.delete('/:id', isValidateId, BookController.deleteBook);

module.exports = bookRouter;
