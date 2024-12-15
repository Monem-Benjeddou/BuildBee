const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/', groupController.getAllGroups);
router.get('/:id', groupController.getGroupById);
router.post('/', groupController.createGroup);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);
router.get('/:id/students', groupController.getGroupStudents);
router.get('/:id/sessions', groupController.getGroupSessions);
router.post('/:id/students', groupController.addStudentToGroup);
router.delete('/:id/students/:studentId', groupController.removeStudentFromGroup);

module.exports = router;
