const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    weeks: {
      type: Number,
      required: true
    },
    days: {
      type: Number,
      default: null
    }
  },
  type: {
    type: String,
    required: true,
    enum: ['regular', 'camp'],
    default: 'regular'
  },
  activities: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    order: Number,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Virtual for program progress
programSchema.virtual('progress').get(function() {
  if (!this.activities || this.activities.length === 0) return 0;
  const completedActivities = this.activities.filter(activity => activity.completed).length;
  return (completedActivities / this.activities.length) * 100;
});

// Method to check if program is active
programSchema.methods.isActive = function() {
  const now = new Date();
  return this.status === 'active' && 
         now >= this.startDate && 
         now <= this.endDate;
};

// Pre-save middleware to calculate endDate if not provided
programSchema.pre('save', function(next) {
  if (!this.endDate && this.startDate && this.duration) {
    const endDate = new Date(this.startDate);
    if (this.type === 'regular') {
      endDate.setDate(endDate.getDate() + (this.duration.weeks * 7));
    } else {
      endDate.setDate(endDate.getDate() + this.duration.days);
    }
    this.endDate = endDate;
  }
  next();
});

module.exports = mongoose.model('Program', programSchema);
