const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    container: {
        type: mongoose.Schema.ObjectId,
        ref: 'Container'
    },
    type:
    {
        type: String,
        enum: ['rack', 'paperbag'],
        required: true
    },
    inventory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Inventory'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});





module.exports = mongoose.model('Container',containerSchema);