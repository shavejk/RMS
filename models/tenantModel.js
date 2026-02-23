const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roomNo: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true, unique: true,
    },
    monthlyRent: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);
