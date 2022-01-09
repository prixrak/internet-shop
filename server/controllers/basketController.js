const { BasketDevice, User, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async addDeviceToBasket(req, res) {
    const {userId, deviceId} = req.body; // get obj with data from req.body
    const basketDevice = await BasketDevice.findOrCreate(
      {
        where: {
          userId,
          deviceId
        }
      },
    );
    return res.json(basketDevice);
  }

  async delete(req, res) {
    const {userId, deviceId} = req.body; // get obj with data from req.body
    const basketDevice = await BasketDevice.destroy({
      where: {
        userId,
        deviceId
      },
      force: true
    });

    return res.json(basketDevice);

  }

  async getBasketDevices(req, res) {
    const userId = req.user.id;
    let {limit, page, name} = req.query;

    if(limit == -1) {
      const basketDevices = await BasketDevice.findAndCountAll({where: {userId}});
      const devices = {count: basketDevices.count, rows: []};
      for (const basketDevice of basketDevices.rows) {
        let device = await Device.findOne({where: {id: basketDevice.deviceId}});
        devices.rows.push(device);
      }
      return res.json(devices);
    }

    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;  

    const basketDevices = await BasketDevice.findAndCountAll({where: {userId}, limit: parseInt(limit), offset: parseInt(offset)});

    const devices = {count: basketDevices.count, rows: []};
    for (const basketDevice of basketDevices.rows) {
      let device = await Device.findOne({where: {id: basketDevice.deviceId}});
      devices.rows.push(device);
    }

    return res.json(devices);
  }
}

module.exports = new BasketController();