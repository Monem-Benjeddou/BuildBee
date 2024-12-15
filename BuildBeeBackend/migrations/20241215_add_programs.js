const mongoose = require('mongoose');
const Program = require('../models/Program');
const Group = require('../models/Group');

module.exports = {
  async up(db) {
    // Add programs field to groups if it doesn't exist
    await db.collection('groups').updateMany(
      {},
      { $set: { programs: [] } }
    );

    // Create initial programs
    const programs = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Bricks Challenge',
        description: 'Programme de construction de modèles pédagogiques sur 36 semaines',
        type: 'regular',
        duration: {
          weeks: 36,
          days: null
        },
        activities: [
          {
            name: 'Module 1: Introduction aux briques',
            description: 'Familiarisation avec les différents types de briques',
            order: 1,
            completed: false
          },
          {
            name: 'Module 2: Construction simple',
            description: 'Premiers modèles de base',
            order: 2,
            completed: false
          },
          {
            name: 'Module 3: Mécanismes',
            description: 'Introduction aux mécanismes simples',
            order: 3,
            completed: false
          }
        ],
        status: 'active',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-12-15'),
        groups: []
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Camp d\'été Galileo',
        description: 'Camp d\'été intensif de 5 jours sur les sciences et la technologie',
        type: 'camp',
        duration: {
          weeks: null,
          days: 5
        },
        activities: [
          {
            name: 'Jour 1: Découverte',
            description: 'Introduction aux concepts de base',
            order: 1,
            completed: false
          },
          {
            name: 'Jour 2: Expérimentation',
            description: 'Travaux pratiques et expériences',
            order: 2,
            completed: false
          },
          {
            name: 'Jour 3: Construction',
            description: 'Réalisation de projets',
            order: 3,
            completed: false
          },
          {
            name: 'Jour 4: Innovation',
            description: 'Projets créatifs',
            order: 4,
            completed: false
          },
          {
            name: 'Jour 5: Présentation',
            description: 'Présentation des projets',
            order: 5,
            completed: false
          }
        ],
        status: 'inactive',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-07-05'),
        groups: []
      }
    ];

    await db.collection('programs').insertMany(programs);

    // Update first group to include Bricks Challenge program
    const firstGroup = await db.collection('groups').findOne({});
    if (firstGroup) {
      await db.collection('groups').updateOne(
        { _id: firstGroup._id },
        { $push: { programs: programs[0]._id } }
      );

      await db.collection('programs').updateOne(
        { _id: programs[0]._id },
        { $push: { groups: firstGroup._id } }
      );
    }
  },

  async down(db) {
    // Remove programs collection
    await db.collection('programs').drop();

    // Remove programs field from groups
    await db.collection('groups').updateMany(
      {},
      { $unset: { programs: "" } }
    );
  }
};
