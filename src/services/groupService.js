import { apiGet, apiPost, apiPut, apiDelete } from '../utils/fileUtils';

const transformGroup = (group) => {
  if (!group) return null;
  
  // Transform sessions if they exist
  const sessions = group.sessions?.map(session => ({
    ...session,
    id: session._id,
    formattedDateTime: new Date(session.date).toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  })) || [];

  return {
    ...group,
    id: group._id,
    sessions
  };
};

const transformGroups = (groups) => {
  if (!Array.isArray(groups)) return [];
  return groups.map(transformGroup);
};

export const getAllGroups = async () => {
  const groups = await apiGet('/groups?populate=sessions');
  return transformGroups(groups);
};

export const getGroup = async (id) => {
  const group = await apiGet(`/groups/${id}?populate=sessions`);
  return transformGroup(group);
};

export const createGroup = async (groupData) => {
  const group = await apiPost('/groups', groupData);
  return transformGroup(group);
};

export const updateGroup = async (id, groupData) => {
  const group = await apiPut(`/groups/${id}`, groupData);
  return transformGroup(group);
};

export const deleteGroup = async (id) => {
  return apiDelete(`/groups/${id}`);
};

export const addStudentToGroup = async (groupId, studentId) => {
  return apiPost(`/groups/${groupId}/students`, { studentId });
};

export const removeStudentFromGroup = async (groupId, studentId) => {
  return apiDelete(`/groups/${groupId}/students/${studentId}`);
};

export const getGroupStudents = async (groupId) => {
  return apiGet(`/groups/${groupId}/students`);
};

export const getGroupSessions = async (groupId) => {
  return apiGet(`/groups/${groupId}/sessions`);
};
