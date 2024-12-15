const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.getAllSessions);
router.get('/upcoming', sessionController.getUpcomingSessions);
router.get('/completed', sessionController.getCompletedSessions);
router.get('/:id', sessionController.getSessionById);
router.post('/', sessionController.createSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);
router.get('/:id/attendance', sessionController.getSessionAttendance);
router.post('/:id/attendance', sessionController.markAttendance);

module.exports = router;
