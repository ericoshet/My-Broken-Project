const UserService = require('../services/UserService');
const formatResponse = require('../utils/formatResponse');

class UserController {

 static async getAllUsersBooks(req, res) {
    const { id } = req.params;
    try {
      const findedBooks = await UserService.getAllBooksByUserId( id );
      return res.status(200).json(formatResponse(200, 'Книги получены', findedBooks));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500,'Ошибка сервера' ));
    }
  }

//   static async getLikeDishes(req, res){
//    const { id } = req.params; 
// try {
//     const result = await UserService.allLikeDishesByUser(id);
//       return res.status(200).json(formatResponse(200, 'Рецепты получены',result));
// } catch (error) {
//    console.log(error);
//       return res.status(500).json(formatResponse(500,'Ошибка сервера' ));
// }
//   }

}

module.exports = UserController;   