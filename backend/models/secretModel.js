const mongoose = require('mongoose');
const secretSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add text']
    }
}, {
    timestamps: true
    }
)

module.exports = mongoose.model('Secret', secretSchema)