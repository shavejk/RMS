const mongoose = require('mongoose');

const electricitySchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },

  month: {
    type: String,
    required: true
  },
  previousReading: {
    type: Number,
    required: true,
  },
  currentReading: {
    type: Number,
    required: true,
  },
  unitRate: {
    type: Number,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Electricity', electricitySchema);
