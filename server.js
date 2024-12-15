const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, 'src', 'data', 'data.json');

// Read data from file
const readDataFile = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return null;
  }
};

// Write data to file
const writeDataFile = async (data) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
};

module.exports = {
  readDataFile,
  writeDataFile
};
