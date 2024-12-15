import { v4 as uuidv4 } from 'uuid';
import { getData, writeData } from '../utils/fileUtils';

// Get all students
export const getAllStudents = async () => {
  const data = await getData();
  return data.students || [];
};

// Get student by ID
export const getStudentById = async (id) => {
  const data = await getData();
  return data.students.find(student => student.id === id);
};

// Create new student
export const createStudent = async (studentData) => {
  const data = await getData();
  
  const newStudent = {
    id: uuidv4(),
    ...studentData,
    groupIds: studentData.groupIds || []
  };
  
  // Add student to data
  data.students.push(newStudent);

  // Update group associations
  if (studentData.groupIds) {
    studentData.groupIds.forEach(groupId => {
      const group = data.groups.find(g => g.id === groupId);
      if (group) {
        if (!group.studentIds) {
          group.studentIds = [];
        }
        if (!group.studentIds.includes(newStudent.id)) {
          group.studentIds.push(newStudent.id);
        }
      }
    });
  }

  await writeData(data);
  return newStudent;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const data = await getData();
  const index = data.students.findIndex(student => student.id === id);
  if (index === -1) return null;

  const oldStudent = data.students[index];
  const oldGroupIds = oldStudent.groupIds || [];
  const newGroupIds = studentData.groupIds || [];

  // Remove student from groups they're no longer in
  oldGroupIds.forEach(groupId => {
    if (!newGroupIds.includes(groupId)) {
      const group = data.groups.find(g => g.id === groupId);
      if (group && group.studentIds) {
        const studentIndex = group.studentIds.indexOf(id);
        if (studentIndex !== -1) {
          group.studentIds.splice(studentIndex, 1);
        }
      }
    }
  });

  // Add student to new groups
  newGroupIds.forEach(groupId => {
    if (!oldGroupIds.includes(groupId)) {
      const group = data.groups.find(g => g.id === groupId);
      if (group) {
        if (!group.studentIds) {
          group.studentIds = [];
        }
        if (!group.studentIds.includes(id)) {
          group.studentIds.push(id);
        }
      }
    }
  });

  // Update student data
  const updatedStudent = {
    ...oldStudent,
    ...studentData,
    id,
    groupIds: newGroupIds
  };
  
  data.students[index] = updatedStudent;
  await writeData(data);
  return updatedStudent;
};

// Delete student
export const deleteStudent = async (id) => {
  const data = await getData();
  const index = data.students.findIndex(student => student.id === id);
  if (index === -1) return false;

  // Remove student from all groups
  const student = data.students[index];
  if (student.groupIds) {
    student.groupIds.forEach(groupId => {
      const group = data.groups.find(g => g.id === groupId);
      if (group && group.studentIds) {
        const studentIndex = group.studentIds.indexOf(id);
        if (studentIndex !== -1) {
          group.studentIds.splice(studentIndex, 1);
        }
      }
    });
  }

  data.students.splice(index, 1);
  await writeData(data);
  return true;
};

// Delete multiple students
export const deleteStudents = async (ids) => {
  for (const id of ids) {
    await deleteStudent(id);
  }
  return true;
};

// Get students by group
export const getStudentsByGroup = async (groupId) => {
  const data = await getData();
  const group = data.groups.find(g => g.id === groupId);
  if (!group || !group.studentIds) return [];
  
  return data.students.filter(student => group.studentIds.includes(student.id));
};
