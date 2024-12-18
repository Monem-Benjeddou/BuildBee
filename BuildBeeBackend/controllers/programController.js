const Program = require('../models/Program');

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get program by ID
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get active programs
exports.getActivePrograms = async (req, res) => {
  try {
    const programs = await Program.find({ status: 'active' });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get program progress
exports.getProgramProgress = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new program
exports.createProgram = async (req, res) => {
  const program = new Program(req.body);
  try {
    const newProgram = await program.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update program
exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update activity status
exports.updateActivityStatus = async (req, res) => {
  try {
    const program = await Program.findById(req.params.programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const activity = program.activities.id(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    activity.status = req.body.status;
    await program.save();
    
    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete program
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json({ message: 'Program deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
