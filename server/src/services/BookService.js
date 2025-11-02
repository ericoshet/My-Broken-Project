const { Book, User } = require('../../db/models');
class AdviceItemService {
  static async getAllBooks() {
    return Book.findAll({ order: [['createdAt', 'ASC']] });
  }

 static async addBook(data) {
    return Book.create(data);
  }

  static async getOneBook(id) {
    return Book.findByPk(id, {
      include: [{ model: User, attributes: ['name'] }],
    });
  }
 

  static async editBook(data, id) {
    const oneBook = await AdviceItemService.getOneBook(id);
    if (oneBook) {
      await oneBook.update(data);
    }
    return oneBook;
  }

  static async deleteOneBook(id) {
    const oneBook = await AdviceItemService.getOneBook(id);
    if (oneBook) {
      await oneBook.destroy();
    }
    return oneBook;
  }
}

module.exports = AdviceItemService;
