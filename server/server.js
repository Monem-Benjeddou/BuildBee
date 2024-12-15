const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, '..', 'src', 'data', 'data.json');

// Get all data
app.get('/api/data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error reading data file' });
  }
});

// Update data
app.post('/api/data', (req, res) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error writing to data file' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
