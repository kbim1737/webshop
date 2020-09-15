const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideshowImageSchema = new Schema({
    caption: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});

const Image = mongoose.model('SlideshowImage', SlideshowImageSchema);

module.exports = Image;