const { Schema, model } = require('mongoose');
const Build = require('./build');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
<<<<<<< HEAD
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
      },
      password: {
        type: String,
        required: true,
      },
      builds: [Build]
=======
  username: {
    type: String,
    required: true,
    unique: true,
>>>>>>> 203ad0be90b6aee1e3db2fc15508e85af24ae51c
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  builds: [Build]
},
  {
    toJSON: {
      virtuals: true,
    },
  });

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;