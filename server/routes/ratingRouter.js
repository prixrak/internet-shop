const Router = require('express');
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.get('/:deviceId', authMiddleware, ratingController.get);
router.post('/', authMiddleware, ratingController.create);

module.exports = router;