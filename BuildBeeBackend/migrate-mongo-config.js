require('dotenv').config();

const config = {
  mongodb: {
    url: process.env.MONGODB_URI,
    databaseName: "student-management"
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false
};

module.exports = config;
