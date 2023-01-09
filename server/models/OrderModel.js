const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    users: { type: Schema.Types.ObjectId, ref: 'users' },
    products: [{ type: Schema.Types.ObjectId, ref: 'products' }],
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
module.exports = mongoose.model("orders", orderSchema);