const { Schema } = require('mongoose');

const buildSchema = new Schema({
    buildCode: 
      {
        type: String,
      },
    description: {
      type: String,
      required: true,
    },
    buildId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
  });
  
  module.exports = buildSchema;