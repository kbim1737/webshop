const mongoose = require('mongoose');
const SizeSchema = new mongoose.Schema({ size: Number, quantity: Number }, { noId: true });
const ImageSchema = new mongoose.Schema({
    contentType: String,
    data: Buffer
});
const ShoeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        require: true
    },
    color:{
        type: String,
        require: true
    },
    kind: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    sizes:{
        type: [SizeSchema],
        require: true
    },
    images: {
       type: [ImageSchema]
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    newPrice: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Shoe', ShoeSchema);