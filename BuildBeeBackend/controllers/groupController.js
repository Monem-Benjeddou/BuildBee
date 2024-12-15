const Group = require('../models/Group');
const Student = require('../models/Student');

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new group
exports.createGroup = async (req, res) => {
  const group = new Group(req.body);
  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update group
exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete group
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get students in a group
exports.getGroupStudents = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('studentIds');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group.studentIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get sessions for a group
exports.getGroupSessions = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('sessionIds');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json(group.sessionIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add student to group
exports.addStudentToGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const student = await Student.findById(req.body.studentId);
    
    if (!group || !student) {
      return res.status(404).json({ message: 'Group or Student not found' });
    }

    if (!group.studentIds.includes(student._id)) {
      group.studentIds.push(student._id);
      student.groupIds.push(group._id);
      
      await Promise.all([group.save(), student.save()]);
    }
    
    res.json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove student from group
exports.removeStudentFromGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const student = await Student.findById(req.params.studentId);
    
    if (!group || !student) {
      return res.status(404).json({ message: 'Group or Student not found' });
    }

    group.studentIds = group.studentIds.filter(id => id.toString() !== student._id.toString());
    student.groupIds = student.groupIds.filter(id => id.toString() !== group._id.toString());
    
    await Promise.all([group.save(), student.save()]);
    res.json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
