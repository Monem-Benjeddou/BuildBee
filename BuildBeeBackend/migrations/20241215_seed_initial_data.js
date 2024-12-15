const { ObjectId } = require('mongodb');

module.exports = {
  async up(db) {
    // Create new ObjectIds for each document
    const studentIds = {
      student1: new ObjectId(),
      student2: new ObjectId(),
      student3: new ObjectId()
    };

    const groupIds = {
      group1: new ObjectId(),
      group2: new ObjectId()
    };

    const sessionIds = {
      session1: new ObjectId(),
      session2: new ObjectId(),
      session3: new ObjectId(),
      session4: new ObjectId(),
      session5: new ObjectId(),
      session6: new ObjectId(),
      session7: new ObjectId(),
      session8: new ObjectId()
    };

    const programIds = {
      program1: new ObjectId(),
      program2: new ObjectId()
    };

    // Insert students
    await db.collection('students').insertMany([
      {
        _id: studentIds.student1,
        firstName: "Sophie",
        lastName: "Martinsss",
        email: "sophie.martin@email.com",
        phone: "0612345678",
        birthDate: "2010-05-15",
        level: "Débutant",
        avatar: "https://i.pravatar.cc/150?img=1",
        groupIds: [groupIds.group1, groupIds.group2]
      },
      {
        _id: studentIds.student2,
        firstName: "Lucas",
        lastName: "Bernard",
        email: "lucas.bernard@email.com",
        phone: "0623456789",
        birthDate: "2009-08-22",
        level: "Intermédiaire",
        avatar: "https://i.pravatar.cc/150?img=2",
        groupIds: [groupIds.group2]
      },
      {
        _id: studentIds.student3,
        firstName: "Emma",
        lastName: "Dubois",
        email: "emma.dubois@email.com",
        phone: "0634567890",
        birthDate: "2011-03-10",
        level: "Avancé",
        avatar: "https://i.pravatar.cc/150?img=3",
        groupIds: [groupIds.group2]
      }
    ]);

    // Insert groups
    await db.collection('groups').insertMany([
      {
        _id: groupIds.group1,
        name: "Group A",
        description: "Advanced group for experienced students",
        level: "Beginner",
        ageRange: {
          min: 8,
          max: 10
        },
        studentIds: [studentIds.student1],
        sessionIds: [sessionIds.session1, sessionIds.session2, sessionIds.session5, sessionIds.session6]
      },
      {
        _id: groupIds.group2,
        name: "Group B",
        description: "Intermediate level group for ages 11-13",
        level: "Intermediate",
        ageRange: {
          min: 11,
          max: 13
        },
        studentIds: [studentIds.student1, studentIds.student2, studentIds.student3],
        sessionIds: [sessionIds.session3, sessionIds.session4, sessionIds.session7, sessionIds.session8]
      }
    ]);

    // Insert sessions
    await db.collection('sessions').insertMany([
      {
        _id: sessionIds.session1,
        name: "Introduction to Advanced Techniques",
        date: "2024-01-20T14:00:00Z",
        duration: 120,
        location: "Studio 1",
        description: "Advanced techniques and practice session",
        status: "upcoming",
        groupId: groupIds.group1,
        attendance: []
      },
      {
        _id: sessionIds.session2,
        name: "Performance Practice",
        date: "2024-01-27T14:00:00Z",
        duration: 90,
        location: "Main Hall",
        description: "Practice session for upcoming performance",
        status: "upcoming",
        groupId: groupIds.group1,
        attendance: []
      },
      {
        _id: sessionIds.session3,
        name: "Basic Skills Review",
        date: "2024-01-21T15:30:00Z",
        duration: 60,
        location: "Studio 2",
        description: "Review of fundamental techniques",
        status: "upcoming",
        groupId: groupIds.group2,
        attendance: []
      },
      {
        _id: sessionIds.session4,
        name: "Group Practice",
        date: "2024-01-28T15:30:00Z",
        duration: 90,
        location: "Practice Room",
        description: "Group practice and coordination exercises",
        status: "upcoming",
        groupId: groupIds.group2,
        attendance: []
      },
      {
        _id: sessionIds.session5,
        name: "Advanced Choreography",
        date: "2024-02-03T14:00:00Z",
        duration: 120,
        location: "Studio 1",
        description: "Advanced choreography workshop",
        status: "upcoming",
        groupId: groupIds.group1,
        attendance: []
      },
      {
        _id: sessionIds.session6,
        name: "Competition Preparation",
        date: "2024-02-10T14:00:00Z",
        duration: 180,
        location: "Main Hall",
        description: "Preparation for upcoming competition",
        status: "upcoming",
        groupId: groupIds.group1,
        attendance: []
      },
      {
        _id: sessionIds.session7,
        name: "Technique Workshop",
        date: "2024-02-04T15:30:00Z",
        duration: 90,
        location: "Studio 2",
        description: "Focused workshop on technical skills",
        status: "upcoming",
        groupId: groupIds.group2,
        attendance: []
      },
      {
        _id: sessionIds.session8,
        name: "Team Building Session",
        date: "2024-02-11T15:30:00Z",
        duration: 120,
        location: "Practice Room",
        description: "Team building and group coordination",
        status: "upcoming",
        groupId: groupIds.group2,
        attendance: []
      }
    ]);

    // Insert programs
    await db.collection('programs').insertMany([
      {
        _id: programIds.program1,
        name: "Brick Building Challenge",
        description: "Learn engineering principles through brick building",
        duration: "8 weeks"
      },
      {
        _id: programIds.program2,
        name: "Galileo Technic",
        description: "Advanced technical concepts for young engineers",
        duration: "12 weeks"
      }
    ]);
  },

  async down(db) {
    // Remove all seeded data
    await db.collection('students').deleteMany({});
    await db.collection('groups').deleteMany({});
    await db.collection('sessions').deleteMany({});
    await db.collection('programs').deleteMany({});
  }
};
