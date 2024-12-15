import { apiGet, apiPost, apiPut, apiDelete } from '../utils/fileUtils';

const transformSession = (session) => {
  if (!session) return null;
  return {
    ...session,
    id: session._id
  };
};

const transformSessions = (sessions) => {
  if (!Array.isArray(sessions)) return [];
  return sessions.map(transformSession);
};

// Get all sessions
export const getAllSessions = async () => {
  const sessions = await apiGet('/sessions');
  return transformSessions(sessions);
};

// Get session by ID
export const getSessionById = async (id) => {
  const session = await apiGet(`/sessions/${id}`);
  return transformSession(session);
};

// Create new session
export const createSession = async (sessionData) => {
  if (!sessionData.name || !sessionData.date || !sessionData.duration || 
      !sessionData.location || !sessionData.description || !sessionData.groupId) {
    throw new Error('All fields are required: name, date, duration, location, description, and group');
  }

  // Ensure required fields and proper format
  const session = await apiPost('/sessions', {
    name: sessionData.name.trim(),
    date: sessionData.date instanceof Date 
      ? sessionData.date.toISOString()  // Keep full ISO string for proper datetime
      : new Date(sessionData.date).toISOString(), // Convert string to proper ISO date
    duration: parseInt(sessionData.duration),
    location: sessionData.location.trim(),
    description: sessionData.description.trim(),
    status: 'upcoming',
    groupId: sessionData.groupId,
    attendance: [] // Initialize empty attendance array
  });
  return transformSession(session);
};

// Update session
export const updateSession = async (id, sessionData) => {
  // Only send fields that are being updated
  const updateData = {
    ...(sessionData.name && { name: sessionData.name }),
    ...(sessionData.date && { date: sessionData.date.toISOString().split('T')[0] }),
    ...(sessionData.duration && { duration: parseInt(sessionData.duration) }),
    ...(sessionData.location && { location: sessionData.location }),
    ...(sessionData.description && { description: sessionData.description }),
    ...(sessionData.status && { status: sessionData.status }),
    ...(sessionData.groupId && { groupId: sessionData.groupId })
  };
  
  const session = await apiPut(`/sessions/${id}`, updateData);
  return transformSession(session);
};

// Delete session
export const deleteSession = async (id) => {
  return apiDelete(`/sessions/${id}`);
};

// Get session attendance
export const getSessionAttendance = async (id) => {
  return apiGet(`/sessions/${id}/attendance`);
};

// Mark attendance
export const markAttendance = async (id, studentIds) => {
  if (!id || !Array.isArray(studentIds)) {
    throw new Error('Invalid parameters for marking attendance');
  }
  const session = await apiPut(`/sessions/${id}`, { attendance: studentIds });
  return transformSession(session);
};

// Get upcoming sessions
export const getUpcomingSessions = async () => {
  const allSessions = await apiGet('/sessions');
  const now = new Date();
  
  // Filter sessions that are in the future
  const upcomingSessions = allSessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate > now || (
      sessionDate.getDate() === now.getDate() &&
      sessionDate.getMonth() === now.getMonth() &&
      sessionDate.getFullYear() === now.getFullYear() &&
      session.status === 'upcoming'
    );
  });
  
  // Sort by date, earliest first
  upcomingSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return transformSessions(upcomingSessions);
};

// Get completed sessions
export const getCompletedSessions = async () => {
  const sessions = await apiGet('/sessions/completed');
  return transformSessions(sessions);
};
