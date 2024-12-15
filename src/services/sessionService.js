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
  // Ensure required fields and proper format
  const session = await apiPost('/sessions', {
    name: sessionData.name,
    date: sessionData.date.toISOString().split('T')[0], // Format: YYYY-MM-DD
    duration: parseInt(sessionData.duration),
    location: sessionData.location,
    description: sessionData.description || '',
    status: 'upcoming', // Default status for new sessions
    groupId: sessionData.groupId
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
  return apiPost(`/sessions/${id}/attendance`, {
    attendance: studentIds
  });
};

// Get upcoming sessions
export const getUpcomingSessions = async () => {
  const sessions = await apiGet('/sessions/upcoming');
  return transformSessions(sessions);
};

// Get completed sessions
export const getCompletedSessions = async () => {
  const sessions = await apiGet('/sessions/completed');
  return transformSessions(sessions);
};
