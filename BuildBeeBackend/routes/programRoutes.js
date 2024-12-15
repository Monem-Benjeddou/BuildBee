const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

// Base CRUD routes
router.get('/', programController.getAllPrograms);
router.get('/active', programController.getActivePrograms);
router.get('/:id', programController.getProgramById);
router.post('/', programController.createProgram);
router.put('/:id', programController.updateProgram);
router.delete('/:id', programController.deleteProgram);

// Program progress and activities
router.get('/:id/progress', programController.getProgramProgress);
router.patch('/:programId/activities/:activityId', programController.updateActivityStatus);

module.exports = router;
