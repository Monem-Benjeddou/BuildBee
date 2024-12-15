import { v4 as uuidv4 } from 'uuid';
import { getData, writeData } from '../utils/fileUtils';

export const getAllGroups = () => {
  const data = getData();
  return data?.groups || [];
};

export const getGroup = (id) => {
  const data = getData();
  return data.groups.find(group => group.id === id);
};

export const createGroup = (groupData) => {
  const data = getData();
  if (!data) return null;

  const newGroup = {
    id: uuidv4(),
    ...groupData,
    studentIds: [],
    sessions: groupData.sessions || []
  };

  if (!data.groups) {
    data.groups = [];
  }

  data.groups.push(newGroup);
  writeData(data);

  return newGroup;
};

export const updateGroup = (id, groupData) => {
  const data = getData();
  if (!data) return null;

  const index = data.groups.findIndex(group => group.id === id);
  if (index === -1) return null;

  const updatedGroup = {
    ...data.groups[index],
    ...groupData,
    id,
    studentIds: groupData.studentIds || data.groups[index].studentIds,
    sessions: groupData.sessions || data.groups[index].sessions
  };

  data.groups[index] = updatedGroup;
  writeData(data);

  return updatedGroup;
};

export const deleteGroup = (id) => {
  const data = getData();
  if (!data) return false;

  const index = data.groups.findIndex(group => group.id === id);
  if (index === -1) return false;

  data.groups.splice(index, 1);
  writeData(data);

  return true;
};

export const addStudentToGroup = (groupId, studentId) => {
  const data = getData();
  if (!data) return false;

  const group = data.groups.find(g => g.id === groupId);
  if (!group) return false;

  if (!group.studentIds) {
    group.studentIds = [];
  }

  if (!group.studentIds.includes(studentId)) {
    group.studentIds.push(studentId);
    writeData(data);
  }

  return true;
};

export const removeStudentFromGroup = (groupId, studentId) => {
  const data = getData();
  if (!data) return false;

  const group = data.groups.find(g => g.id === groupId);
  if (!group || !group.studentIds) return false;

  group.studentIds = group.studentIds.filter(id => id !== studentId);
  writeData(data);

  return true;
};
