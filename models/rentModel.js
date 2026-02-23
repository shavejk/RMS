const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    month: {
        type: String,
        required: true,
    },

    rentAmount: { type: Number, required: true, },

    paid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Rent', rentSchema);
