const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'products' }],
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

categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("categories", categorySchema);