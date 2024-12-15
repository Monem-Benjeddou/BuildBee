const mongoose = require('mongoose');

/**
 * Remove the level field from all groups since we're using sessions for level management
 */
module.exports = {
  async up(db, client) {
    // First, update the collection's validator
    await db.command({
      collMod: 'groups',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'description', 'ageRange'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'Name must be a string and is required'
            },
            description: {
              bsonType: 'string',
              description: 'Description must be a string and is required'
            },
            ageRange: {
              bsonType: 'object',
              required: ['min', 'max'],
              properties: {
                min: {
                  bsonType: 'number',
                  description: 'Min age must be a number and is required'
                },
                max: {
                  bsonType: 'number',
                  description: 'Max age must be a number and is required'
                }
              }
            },
            studentIds: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              }
            },
            sessionIds: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              }
            }
          }
        }
      }
    });

    // Then update the documents
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.collection('groups').updateMany(
          {},
          { $unset: { level: "" } },
          { bypassDocumentValidation: true }
        );
      });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    // First, update the collection's validator to include level
    await db.command({
      collMod: 'groups',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'description', 'ageRange', 'level'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'Name must be a string and is required'
            },
            description: {
              bsonType: 'string',
              description: 'Description must be a string and is required'
            },
            level: {
              bsonType: 'string',
              description: 'Level must be a string and is required'
            },
            ageRange: {
              bsonType: 'object',
              required: ['min', 'max'],
              properties: {
                min: {
                  bsonType: 'number',
                  description: 'Min age must be a number and is required'
                },
                max: {
                  bsonType: 'number',
                  description: 'Max age must be a number and is required'
                }
              }
            },
            studentIds: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              }
            },
            sessionIds: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              }
            }
          }
        }
      }
    });

    // Then update the documents
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.collection('groups').updateMany(
          { level: { $exists: false } },
          { $set: { level: 'Intermediate' } },
          { bypassDocumentValidation: true }
        );
      });
    } finally {
      await session.endSession();
    }
  }
};
