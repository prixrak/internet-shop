const Router = require('express');
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();
router.get('/', authMiddleware, basketController.getBasketDevices);
router.post('/', authMiddleware, basketController.addDeviceToBasket);
router.delete('/', authMiddleware, basketController.delete);

module.exports = router;