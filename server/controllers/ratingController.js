const { Rating, Device } = require("../models/models");

class RatingController {
  async get(req, res) {
    const userId = req.user.id;
    const {deviceId} = req.params;
    const deviceRateByUser = await Rating.findOne({where: {userId, deviceId}});
    return res.json(deviceRateByUser);
  }

  async create(req, res) {
    const userId = req.user.id;
    let {deviceId, rate} = req.body;
    let deviceRateByUser = await Rating.findOne({where: {userId, deviceId}});
    if(deviceRateByUser == 'null' || !deviceRateByUser) deviceRateByUser = await Rating.create({userId, deviceId, rate});
    else {
      deviceRateByUser.rate = rate;
      await deviceRateByUser.save();
    }

    // set averate rating to device 
    let device = await Device.findOne({where: {id: deviceId}});
    const ratesToDevice = await Rating.findAll({where: {deviceId}});
    rate = 0;
    ratesToDevice.forEach(rating => rate += rating.rate);
    rate /= ratesToDevice.length;
    rate = Math.round(rate, 1);
    device.rating = rate;
    device.save();
    //
    return res.json(deviceRateByUser);
  }
}

module.exports = new RatingController();