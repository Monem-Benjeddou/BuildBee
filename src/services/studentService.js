import { v4 as uuidv4 } from 'uuid';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils/fileUtils';

const transformStudent = async (student) => {
  if (!student) return null;
  
  // Fetch group details for the student if they have groupIds
  let groups = '';
  if (student.groupIds && student.groupIds.length > 0) {
    try {
      const groupPromises = student.groupIds.map(groupId => apiGet(`/groups/${groupId}`));
      const groupDetails = await Promise.all(groupPromises);
      groups = groupDetails
        .filter(group => group) // Remove any null groups
        .map(group => group.name)
        .join(', ');
    } catch (error) {
      console.error('Error fetching group details:', error);
    }
  }

  return {
    ...student,
    id: student._id,
    groups // Add the groups field
  };
};

const transformStudents = async (students) => {
  if (!Array.isArray(students)) return [];
  const transformedStudents = await Promise.all(students.map(transformStudent));
  return transformedStudents.filter(student => student !== null);
};

// Get all students
export const getAllStudents = async (params = {}) => {
  const students = await apiGet('/students', params);
  return transformStudents(students);
};

// Get student by ID
export const getStudentById = async (id) => {
  const student = await apiGet(`/students/${id}`);
  return transformStudent(student);
};

// Create new student
export const createStudent = async (studentData) => {
  const student = await apiPost('/students', studentData);
  return transformStudent(student);
};

// Update student
export const updateStudent = async (id, studentData) => {
  const student = await apiPut(`/students/${id}`, studentData);
  return transformStudent(student);
};

// Delete student
export const deleteStudent = async (id) => {
  return apiDelete(`/students/${id}`);
};

// Delete multiple students
export const deleteStudents = async (ids) => {
  return Promise.all(ids.map(id => deleteStudent(id)));
};

// Get students by group
export const getStudentsByGroup = async (groupId) => {
  const students = await apiGet(`/groups/${groupId}/students`);
  return transformStudents(students);
};
