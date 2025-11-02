const { User, Dish: Book } = require('../../db/models');

class UserService {
  static async getAllBooksByUserId(userId) {
   // console.log(userId);

    if (!userId) {
      throw new Error('Нет такого пользователя');
    }

    return Book.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']],
    });
  }

// static async allLikeDishesByUser(id){
// const user = await User.findByPk(id, {
//     include: [{
//       model: Book,
//       as: 'wantedDish'
//     }]
//   });

//   return user ? user.wantedDish : [];
// }

}
module.exports = UserService;