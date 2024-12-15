import initialData from '../data/data.json';

const STORAGE_KEY = 'buildbee_data';

// Initialize data from data.json if not in localStorage
const initializeData = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

initializeData();

export const getData = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : initialData;
  } catch (error) {
    console.error('Error reading data:', error);
    return initialData;
  }
};

export const writeData = async (newData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
import data from '../data/data.json';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const getData = () => {
  try {
    return data;
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

export const writeData = async (newData) => {
  try {
    const scriptPath = 'scripts/updateData.js';
    const jsonData = JSON.stringify(newData);
    const { stdout, stderr } = await execAsync(`node ${scriptPath} '${jsonData}'`);
    
    if (stderr) {
      console.error('Error from script:', stderr);
      return false;
    }
    
    const result = JSON.parse(stdout);
    return result.success;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};