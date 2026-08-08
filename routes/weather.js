const router = require('express').Router();
const weatherController = require('../controllers/weather');
const { isAuthenticated } = require("../middleware/authenticate");
const validationGuard = require('../middleware/validate');

// GET all weather reports
router.get('/', weatherController.getAllWeather);

// GET a single weather report by ID
router.get('/:id', weatherController.getSingleWeather);

// POST a new weather report (Protected by Auth & Validation)
router.post('/', isAuthenticated, validationGuard.saveWeather, weatherController.createWeather);

// PUT update an existing weather report (Protected by Auth & Validation)
router.put('/:id', isAuthenticated, validationGuard.saveWeather, weatherController.updateWeather);

// DELETE a weather report (Protected by Auth)
router.delete('/:id', isAuthenticated, weatherController.deleteWeather);

module.exports = router;
