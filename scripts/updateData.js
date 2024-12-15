const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'data.json');

async function updateData(newData) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error writing data:', error);
    return { success: false, error: error.message };
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.length > 0) {
  try {
    const data = JSON.parse(args[0]);
    updateData(data).then(result => {
      console.log(JSON.stringify(result));
      process.exit(result.success ? 0 : 1);
    });
  } catch (error) {
    console.error('Error parsing input:', error);
    process.exit(1);
  }
}
