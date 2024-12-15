const Session = require('../models/Session');

// Get all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Populate the session with all required data
    const populatedSession = await Session.findById(session._id)
      .populate({
        path: 'groupId',
        model: 'Group',
        select: 'name description studentIds',
        populate: {
          path: 'studentIds',
          model: 'Student',
          select: 'firstName lastName avatar'
        }
      })
      .populate({
        path: 'attendance',
        model: 'Student',
        select: 'firstName lastName avatar'
      });

    if (!populatedSession) {
      return res.status(404).json({ message: 'Session not found after population' });
    }

    res.json(populatedSession);
  } catch (error) {
    console.error('Error in getSessionById:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new session
exports.createSession = async (req, res) => {
  const session = new Session(req.body);
  try {
    const newSession = await session.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update session
exports.updateSession = async (req, res) => {
  try {
    // If only updating attendance, preserve other fields
    if (req.body.attendance !== undefined && Object.keys(req.body).length === 1) {
      const session = await Session.findById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      session.attendance = req.body.attendance;
      const updatedSession = await session.save();
      return res.json(updatedSession);
    }

    // For full session updates
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete session
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json({ message: 'Session deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance for a session
exports.getSessionAttendance = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate('attendance');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json(session.attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark attendance for a session
exports.markAttendance = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.attendance = req.body.attendance;
    await session.save();

    // Return fully populated session data
    const populatedSession = await Session.findById(session._id)
      .populate({
        path: 'groupId',
        model: 'Group',
        select: 'name description studentIds',
        populate: {
          path: 'studentIds',
          model: 'Student',
          select: 'firstName lastName avatar'
        }
      })
      .populate({
        path: 'attendance',
        model: 'Student',
        select: 'firstName lastName avatar'
      });

    res.json(populatedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUpcomingSessions = async (req, res) => {
  try {
    // Get current date and format it to match our stored format
    const currentDate = new Date();
    const isoDate = currentDate.toISOString().slice(0, 19) + 'Z'; // Format: YYYY-MM-DDTHH:mm:ssZ
    console.log("Current Date (formatted):", isoDate);

    const query = { 
      date: { 
        $gte: isoDate // Compare with the formatted ISO string
      } 
    };
    console.log("Query:", JSON.stringify(query));

    const sessions = await Session.find(query).sort({ date: 1 });
    console.log("Found sessions:", sessions.length);

    res.json(sessions);
  } catch (error) {
    console.error("Error in getUpcomingSessions:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get completed sessions
exports.getCompletedSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'completed' });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
