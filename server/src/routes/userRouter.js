const express = require('express');
const UserController = require('../controllers/UserController');

const userRouter = express.Router();

// возвращает все занесённые в базу книги пользователем
 userRouter.get('/:id', UserController.getAllUsersBooks);

// возвращает товары в корзину пользователя
// userRouter.get('/favorite/:id', UserController.getLikeDishes);

module.exports = userRouter;