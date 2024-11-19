const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  categories: [
    {
    type: String,
    required: true
  }
],
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String
      }
    }
  ],
  averageRating: {
    type: Number,
    default: 0
  }
  
}, {
  timestamps: true, autoIndex: false
});

module.exports = mongoose.model('Product', ProductSchema);
