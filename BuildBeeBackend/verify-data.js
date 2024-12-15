require('dotenv').config();
const mongoose = require('mongoose');

async function verifyData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Check all collections
    const collections = ['students', 'groups', 'sessions', 'programs'];
    
    for (const collectionName of collections) {
      const count = await mongoose.connection.db.collection(collectionName).countDocuments();
      console.log(`${collectionName}: ${count} documents`);
      
      // Show one sample document
      const sampleDoc = await mongoose.connection.db.collection(collectionName).findOne();
      console.log('Sample document:');
      console.log(JSON.stringify(sampleDoc, null, 2));
      console.log('\n-------------------\n');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

verifyData();
