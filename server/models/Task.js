import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required.'],
    trim: true,
  },
  originalInput: { // To store the raw text for potential re-parsing or context
    type: String,
    trim: true,
    optional: true,
  },
  dateISO: { // Stores the date and time for the task
    type: Date,
    required: true,
    default: Date.now,
  },
  isDateParsed: { // Flag to indicate if dateISO was from parsing or default
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // userId: { // To be added if authentication is implemented
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // }
});

// Optional: Add a text index for searching if needed later
// taskSchema.index({ title: 'text', originalInput: 'text' });

const Task = mongoose.model('Task', taskSchema);

export default Task;
