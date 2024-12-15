module.exports = {
  async up(db) {
    // Create collections with validators
    await db.createCollection("students", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["firstName", "lastName", "email", "phone", "birthDate", "level"],
          properties: {
            firstName: {
              bsonType: "string",
              description: "First name of the student"
            },
            lastName: {
              bsonType: "string",
              description: "Last name of the student"
            },
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description: "Email address"
            },
            phone: {
              bsonType: "string",
              description: "Phone number"
            },
            birthDate: {
              bsonType: "string",
              pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              description: "Birth date in YYYY-MM-DD format"
            },
            level: {
              enum: ["Débutant", "Intermédiaire", "Avancé"],
              description: "Student level"
            },
            avatar: {
              bsonType: "string",
              description: "URL to student's avatar"
            },
            groupIds: {
              bsonType: "array",
              items: {
                bsonType: "objectId"
              }
            }
          }
        }
      }
    });

    await db.createCollection("groups", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "description", "level", "ageRange"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name of the group"
            },
            description: {
              bsonType: "string",
              description: "Description of the group"
            },
            level: {
              enum: ["Beginner", "Intermediate", "Advanced"],
              description: "Group level"
            },
            ageRange: {
              bsonType: "object",
              required: ["min", "max"],
              properties: {
                min: {
                  bsonType: "int",
                  description: "Minimum age"
                },
                max: {
                  bsonType: "int",
                  description: "Maximum age"
                }
              }
            },
            studentIds: {
              bsonType: "array",
              items: {
                bsonType: "objectId"
              }
            },
            sessionIds: {
              bsonType: "array",
              items: {
                bsonType: "objectId"
              }
            }
          }
        }
      }
    });

    await db.createCollection("sessions", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "date", "duration", "location", "description", "status", "groupId"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name of the session"
            },
            date: {
              bsonType: "string",
              pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,3})?(([+-]\\d{2}:\\d{2})|Z)?$",
              description: "ISO 8601 datetime string (e.g., 2024-12-15T14:30:00Z)"
            },
            duration: {
              bsonType: "int",
              description: "Duration in minutes"
            },
            location: {
              bsonType: "string",
              description: "Location of the session"
            },
            description: {
              bsonType: "string",
              description: "Description of the session"
            },
            status: {
              enum: ["upcoming", "completed"],
              description: "Status of the session"
            },
            groupId: {
              bsonType: "objectId",
              description: "ID of the associated group"
            },
            attendance: {
              bsonType: "array",
              items: {
                bsonType: "objectId"
              }
            }
          }
        }
      }
    });

    await db.createCollection("programs", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "description", "duration"],
          properties: {
            name: {
              bsonType: "string",
              description: "Name of the program"
            },
            description: {
              bsonType: "string",
              description: "Description of the program"
            },
            duration: {
              bsonType: "string",
              description: "Duration of the program"
            }
          }
        }
      }
    });

    // Create indexes
    await db.collection("students").createIndex({ "email": 1 }, { unique: true });
    await db.collection("groups").createIndex({ "name": 1 }, { unique: true });
    await db.collection("sessions").createIndex({ "date": 1 });
    await db.collection("sessions").createIndex({ "status": 1 });
    await db.collection("programs").createIndex({ "name": 1 }, { unique: true });
  },

  async down(db) {
    // Remove collections
    await db.collection("students").drop();
    await db.collection("groups").drop();
    await db.collection("sessions").drop();
    await db.collection("programs").drop();
  }
};
