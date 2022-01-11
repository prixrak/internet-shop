const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body;
        const type = await Type.create({name});
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }

    async delete(req, res) {
        const { id } = req.body; // get obj with data from req.body
        const deletedType = await Type.destroy({
            where: {
                id
            },
            force: true
        });
        return res.json(deletedType);
    }
}

module.exports = new TypeController();