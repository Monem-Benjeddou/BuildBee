import data from '../data/data.json';

// Get all programs
export const getAllPrograms = () => {
  return data.programs || [];
};

// Get program by ID
export const getProgramById = (id) => {
  return data.programs.find(program => program.id === id);
};

// Get program name by ID
export const getProgramName = (id) => {
  const program = getProgramById(id);
  return program ? program.name : 'Unknown Program';
};
