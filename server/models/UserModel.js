const mongoose = require('mongoose');
const { Schema } = mongoose;
const { roles } = require('../constants/enum');
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new Schema({
  name: { 
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: roles,
    default: roles.CLIENTE,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
  versionKey: false,
}
)

productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', userSchema);