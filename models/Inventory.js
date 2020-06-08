const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({

    items: [{
        name: {
            type: String,
            required: true
        },
        category:
        {
            type: String,
            required: true
        },
        materials: [],
        colors: [],
        size: []
    }]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


module.exports = mongoose.model('Inventory', inventorySchema);