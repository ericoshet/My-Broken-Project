const express = require('express');
const authRouter = require('./authRouter');
const bookRouter = require('./bookRouter');
const userRouter = require('./userRouter');
const apiRouter = express.Router();

apiRouter.use('/books', bookRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/account', userRouter);

apiRouter.use((req, res) => {
  res.status(404).json({ message: "Маршрут не найден" });
});

module.exports = apiRouter;
