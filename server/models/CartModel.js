const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    users: { type: Schema.Types.ObjectId, ref: 'users' },
    productsCart: { 
      type: Array,
      required: true,
    },
    total: { 
      type: Number,
      required: true,
    },
    isActive: Boolean,
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
);
module.exports = mongoose.model("carts", cartSchema);