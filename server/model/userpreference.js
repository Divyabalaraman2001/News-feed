const mongoose = require('mongoose');

const UserPreferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  preferences: { type: [String], default: [] },
});

const UserPreference = mongoose.model('UserPreference', UserPreferenceSchema);

module.exports = UserPreference;
