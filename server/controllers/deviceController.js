const uuid = require('uuid'); // package for generating uniq indentificator
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const { Sequelize } = require('../db');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files; // files are not setted in body
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({name, price, brandId, typeId, img: fileName});;
            console.log("added")

            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                );
            }
            console.log("added")
            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page, name} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let devices;
        if(name && name !== '') {
            if (!brandId && !typeId) devices = await Device.findAndCountAll({
                where:{name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')}, 
                limit: parseInt(limit), offset: parseInt(offset)});
            if (brandId && !typeId) devices = await Device.findAndCountAll({where:{brandId, 
                name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')},
                 limit: parseInt(limit), offset: parseInt(offset)});
            if (!brandId && typeId) devices = await Device.findAndCountAll({where:{typeId,
                name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')},
                limit: parseInt(limit), offset: parseInt(offset)});
            if (brandId && typeId) devices = await Device.findAndCountAll({where:{typeId, brandId,
                 name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')},
                  limit: parseInt(limit), offset: parseInt(offset)});
        } else {
            if (!brandId && !typeId) devices = await Device.findAndCountAll({limit: parseInt(limit), offset: parseInt(offset)});
            if (brandId && !typeId) devices = await Device.findAndCountAll({where:{brandId}, limit: parseInt(limit), offset: parseInt(offset)});
            if (!brandId && typeId) devices = await Device.findAndCountAll({where:{typeId}, limit: parseInt(limit), offset: parseInt(offset)});
            if (brandId && typeId) devices = await Device.findAndCountAll({where:{typeId, brandId}, limit: parseInt(limit), offset: parseInt(offset)});
        }
        
        return res.json(devices);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}] // get also info about descriptions
            },
        );
        return res.json(device);
    }

    async delete(req, res) {
        const {id} = req.body; // get obj with data from req.body
        const deletedDevice = await Device.destroy({
          where: {
            id
          },
          force: true
        });
        
        return res.json(deletedDevice);
    }
}

module.exports = new DeviceController();