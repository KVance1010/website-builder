const { Schema } = require('mongoose');
const imageSchema = require('./images')

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
    images: [imageSchema]
  });
  
  module.exports = buildSchema;