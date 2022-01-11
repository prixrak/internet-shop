const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const { name } = req.body; // get obj with data from req.body
        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    async delete(req, res) {
        const { id } = req.body; // get obj with data from req.body
        const deletedBrand = await Brand.destroy({
            where: {
                id
            },
            force: true
        });
        return res.json(deletedBrand);
    }
}

module.exports = new BrandController();