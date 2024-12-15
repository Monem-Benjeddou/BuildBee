import data from '../data/data.json';

let currentData = { ...data };

// Helper function to generate unique IDs
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Students operations
export const getAllStudents = () => {
  return currentData.students;
};

export const getStudentById = (id) => {
  return currentData.students.find(student => student.id === id);
};

export const createStudent = (studentData) => {
  const newStudent = {
    ...studentData,
    id: generateId(),
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    registrationDate: new Date().toISOString(),
  };
  
  currentData = {
    ...currentData,
    students: [...currentData.students, newStudent]
  };
  
  return newStudent;
};

export const updateStudent = (id, studentData) => {
  const studentIndex = currentData.students.findIndex(student => student.id === id);
  if (studentIndex === -1) return null;

  const updatedStudent = {
    ...currentData.students[studentIndex],
    ...studentData,
  };

  currentData = {
    ...currentData,
    students: currentData.students.map(student =>
      student.id === id ? updatedStudent : student
    )
  };

  return updatedStudent;
};

export const deleteStudent = (id) => {
  currentData = {
    ...currentData,
    students: currentData.students.filter(student => student.id !== id)
  };
  return true;
};

// Groups operations
export const getAllGroups = () => {
  return currentData.groups.map(group => ({
    ...group,
    studentCount: currentData.students.filter(student => 
      student.groupIds && student.groupIds.includes(group.id)
    ).length
  }));
};

export const getGroupById = (id) => {
  return currentData.groups.find(group => group.id === id);
};

export const createGroup = (groupData) => {
  const newGroup = {
    ...groupData,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  currentData = {
    ...currentData,
    groups: [...currentData.groups, newGroup]
  };

  return newGroup;
};

export const updateGroup = (id, groupData) => {
  const groupIndex = currentData.groups.findIndex(group => group.id === id);
  if (groupIndex === -1) return null;

  const updatedGroup = {
    ...currentData.groups[groupIndex],
    ...groupData,
  };

  currentData = {
    ...currentData,
    groups: currentData.groups.map(group =>
      group.id === id ? updatedGroup : group
    )
  };

  return updatedGroup;
};

export const deleteGroup = (id) => {
  currentData = {
    ...currentData,
    groups: currentData.groups.filter(group => group.id !== id),
    // Remove the group from all students' groupIds
    students: currentData.students.map(student => ({
      ...student,
      groupIds: student.groupIds ? student.groupIds.filter(gId => gId !== id) : []
    }))
  };
  return true;
};

// Helper functions
export const getStudentsByGroup = (groupId) => {
  return currentData.students.filter(student => 
    student.groupIds && student.groupIds.includes(groupId)
  );
};

export const addStudentToGroup = (studentId, groupId) => {
  const studentIndex = currentData.students.findIndex(student => student.id === studentId);
  if (studentIndex === -1) return false;

  const student = currentData.students[studentIndex];
  const groupIds = student.groupIds || [];

  if (!groupIds.includes(groupId)) {
    currentData = {
      ...currentData,
      students: currentData.students.map(s =>
        s.id === studentId
          ? { ...s, groupIds: [...groupIds, groupId] }
          : s
      )
    };
  }
  return true;
};

export const removeStudentFromGroup = (studentId, groupId) => {
  const studentIndex = currentData.students.findIndex(student => student.id === studentId);
  if (studentIndex === -1) return false;

  const student = currentData.students[studentIndex];
  const groupIds = student.groupIds || [];

  currentData = {
    ...currentData,
    students: currentData.students.map(s =>
      s.id === studentId
        ? { ...s, groupIds: groupIds.filter(id => id !== groupId) }
        : s
    )
  };
  return true;
};
