import { v4 as uuidv4 } from 'uuid';
import { getData, writeData } from '../utils/fileUtils';

// Get all sessions
export const getAllSessions = async () => {
  const data = await getData();
  if (!data) return [];
  
  const sessions = data.sessions || [];
  const groups = data.groups || [];

  return sessions.map(session => ({
    ...session,
    groupName: groups.find(g => g.id === session.groupId)?.name || ''
  }));
};

// Get sessions by group
export const getSessionsByGroup = async (groupId) => {
  const data = await getData();
  if (!data) return [];
  
  const group = data.groups.find(g => g.id === groupId);
  if (!group || !group.sessionIds) return [];
  
  return (data.sessions || []).filter(session => group.sessionIds.includes(session.id));
};

// Create new session
export const createSession = async (sessionData) => {
  const data = await getData();
  if (!data) return null;

  const group = data.groups.find(g => g.id === sessionData.groupId);
  if (!group) return null;

  const newSession = {
    id: uuidv4(),
    name: sessionData.name,
    date: sessionData.date,
    duration: sessionData.duration,
    location: sessionData.location,
    description: sessionData.description || '',
    status: 'upcoming',
    groupId: sessionData.groupId,
    attendance: []
  };

  // Initialize sessions array if it doesn't exist
  if (!data.sessions) {
    data.sessions = [];
  }

  // Add session to sessions array
  data.sessions.push(newSession);

  // Initialize sessionIds array if it doesn't exist
  if (!group.sessionIds) {
    group.sessionIds = [];
  }

  // Add session ID to group
  group.sessionIds.push(newSession.id);

  // Write updated data back to file
  await writeData(data);

  return { ...newSession, groupName: group.name };
};

// Update session
export const updateSession = async (groupId, sessionId, sessionData) => {
  const data = await getData();
  if (!data) return null;

  const sessionIndex = data.sessions.findIndex(s => s.id === sessionId);
  if (sessionIndex === -1) return null;

  const updatedSession = {
    ...data.sessions[sessionIndex],
    name: sessionData.name,
    date: sessionData.date,
    duration: sessionData.duration,
    location: sessionData.location,
    description: sessionData.description || data.sessions[sessionIndex].description
  };

  data.sessions[sessionIndex] = updatedSession;
  
  // Write updated data back to file
  await writeData(data);

  const group = data.groups.find(g => g.id === groupId);
  return { ...updatedSession, groupName: group?.name || '' };
};

// Delete session
export const deleteSession = async (groupId, sessionId) => {
  const data = await getData();
  if (!data) return false;

  const sessionIndex = data.sessions.findIndex(s => s.id === sessionId);
  if (sessionIndex === -1) return false;

  // Remove session from sessions array
  data.sessions.splice(sessionIndex, 1);

  // Remove session ID from group
  const group = data.groups.find(g => g.id === groupId);
  if (group && group.sessionIds) {
    group.sessionIds = group.sessionIds.filter(id => id !== sessionId);
  }

  // Write updated data back to file
  await writeData(data);
  return true;
};

// Mark session as completed
export const markSessionCompleted = async (groupId, sessionId) => {
  const data = await getData();
  if (!data) return false;

  const session = data.sessions.find(s => s.id === sessionId);
  if (!session) return false;

  session.status = 'completed';
  
  // Write updated data back to file
  await writeData(data);
  return true;
};

// Mark attendance
export const markAttendance = async (groupId, sessionId, studentId, present) => {
  const data = await getData();
  if (!data) return false;

  const session = data.sessions.find(s => s.id === sessionId);
  if (!session) return false;

  if (!session.attendance) {
    session.attendance = [];
  }

  const attendanceIndex = session.attendance.findIndex(a => a.studentId === studentId);
  if (attendanceIndex === -1) {
    session.attendance.push({ studentId, present });
  } else {
    session.attendance[attendanceIndex].present = present;
  }

  // Write updated data back to file
  await writeData(data);
  return true;
};
