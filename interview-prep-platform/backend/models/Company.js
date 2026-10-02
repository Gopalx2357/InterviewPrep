const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      required: [true, 'Job role is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    oaDetails: {
      aptitude: { type: String, default: '' },
      coding: { type: String, default: '' },
      mcqs: { type: String, default: '' },
      details: { type: String, default: '' },
    },
    interviewDetails: {
      technical: { type: String, default: '' },
      hr: { type: String, default: '' },
      faqs: { type: [String], default: [] },
    },
    preparationContent: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    resources: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Company', companySchema);
