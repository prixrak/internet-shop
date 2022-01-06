const { BasketDevice, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async getBasket(req, res) {
    const id = req.user.id;
    const basket = await User.findOne(
      {
        where: {id}
      },
    );
    return res.json(basket);
  }

  // async getBasketDevices(req, res) {
  //   const id = req.user.id;
  //   const basket = await Basket.findOne(
  //     {
  //       where: {
  //         userId: id,
  //         basketId: 
  //       }
  //     },
  //   );
  //   return res.json(basket);
  // }
}

module.exports = new BasketController();