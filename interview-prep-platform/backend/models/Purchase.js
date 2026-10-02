const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
      required: true,
    },
    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
      default: null,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      default: null,
    },
    itemType: {
      type: String,
      enum: ['note', 'company', 'all-access'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['created', 'completed', 'failed'],
      default: 'completed',
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Purchase', purchaseSchema);
