import axios from 'axios';
import { API_BASE_URL } from '../config';

// Get all programs
export const getAllPrograms = async () => {
  const response = await axios.get(`${API_BASE_URL}/programs`);
  return response.data;
};

// Get active programs
export const getActivePrograms = async () => {
  const response = await axios.get(`${API_BASE_URL}/programs/active`);
  return response.data;
};

// Get program by ID
export const getProgramById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/programs/${id}`);
  return response.data;
};

// Create program
export const createProgram = async (programData) => {
  const response = await axios.post(`${API_BASE_URL}/programs`, programData);
  return response.data;
};

// Update program
export const updateProgram = async (id, programData) => {
  const response = await axios.put(`${API_BASE_URL}/programs/${id}`, programData);
  return response.data;
};

// Delete program
export const deleteProgram = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/programs/${id}`);
  return response.data;
};

// Get program progress
export const getProgramProgress = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/programs/${id}/progress`);
  return response.data;
};

// Update activity status
export const updateActivityStatus = async (programId, activityId, completed) => {
  const response = await axios.patch(
    `${API_BASE_URL}/programs/${programId}/activities/${activityId}`,
    { completed }
  );
  return response.data;
};
