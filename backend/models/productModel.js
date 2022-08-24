const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    maxLength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
    maxLength: 300,
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: 8,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  categories: {
    type: String,
    required: [true, "Please enter product category"],
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
    maxLength: 4,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", ProductSchema);
