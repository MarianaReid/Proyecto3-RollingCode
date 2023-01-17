const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new Schema(
  {
    products: { type: Schema.Types.ObjectId, ref: 'products' },
    count: {
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

orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("orders", orderSchema);