const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recommendedProducts: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      recommendationScore: {
        type: Number
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
