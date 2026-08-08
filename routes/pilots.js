const router = require('express').Router();
const pilotsController = require('../controllers/pilots');
const { isAuthenticated } = require("../middleware/authenticate");
const validationGuard = require('../middleware/validate');

// GET all pilots
router.get('/', pilotsController.getAllPilots);

// GET a single pilot by ID
router.get('/:id', pilotsController.getSinglePilot);

// POST a new pilot (Protected by Auth & Validation)
router.post('/', isAuthenticated, validationGuard.savePilot, pilotsController.createPilot);

// PUT update an existing pilot (Protected by Auth & Validation)
router.put('/:id', isAuthenticated, validationGuard.savePilot, pilotsController.updatePilot);

// DELETE a pilot (Protected by Auth)
router.delete('/:id', isAuthenticated, pilotsController.deletePilot);

module.exports = router;
