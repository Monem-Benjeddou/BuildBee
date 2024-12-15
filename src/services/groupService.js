import { apiGet, apiPost, apiPut, apiDelete } from '../utils/fileUtils';

const transformGroup = (group) => {
  if (!group) return null;
  return {
    ...group,
    id: group._id
  };
};

const transformGroups = (groups) => {
  if (!Array.isArray(groups)) return [];
  return groups.map(transformGroup);
};

export const getAllGroups = async () => {
  const groups = await apiGet('/groups');
  return transformGroups(groups);
};

export const getGroup = async (id) => {
  const group = await apiGet(`/groups/${id}`);
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
