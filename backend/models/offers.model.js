const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    url: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    fromDate: {
      type: Number,
      required: true,
    },
    toDate: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      enum: ['main', 'side'],
      default: 'main',
    },
    desktopImg: {
      type: String,
      required: true,
    },
    mobImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const offers = mongoose.model('Offers', offerSchema);

module.exports = offers;
