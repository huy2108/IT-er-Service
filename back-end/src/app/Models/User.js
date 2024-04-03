const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete')


const User = new Schema({
    firstname: { type: String },
    lastname: { type: String},
    username: { type: String },
    password: {type: String},
  },{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
  
);

// Add plugins
User.plugin(mongooseDelete,{
  deletedAt: true,
  overrideMethods: 'all',
});  

module.exports = mongoose.model('User', User);