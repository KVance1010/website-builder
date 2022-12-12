const { Schema,  } = require('mongoose');
const imageSchema = require('./images')

const buildSchema = new Schema({
    buildCode: 
      {
        type: Array,
      },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  });
 

  module.exports = buildSchema;