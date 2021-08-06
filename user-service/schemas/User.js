const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Represents a User
 */
const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = UserSchema;