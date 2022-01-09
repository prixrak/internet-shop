const { Rating } = require("../models/models");

class RatingController {
  async get(req, res) {
    const userId = req.user.id;
    const {deviceId} = req.params;
    const deviceRateByUser = await Rating.findOne({where: {userId, deviceId}});
    return res.json(deviceRateByUser);
  }

  async getAverage(req, res) {
    const ratesToDevice = await Rating.findAll({where: deviceId});
  }

  async create(req, res) {
    const userId = req.user.id;
    const {deviceId, rate} = req.body;
    const deviceRateByUser = await Rating.findOne({userId, deviceId});
    if(!deviceRateByUser) deviceRateByUser = await Rating.create({userId, deviceId, rate});
    else {
      deviceRateByUser.rate = rate;
      await deviceRateByUser.save();
    }
    return res.json(deviceRateByUser);
  }
}

module.exports = new RatingController();