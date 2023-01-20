const  mongoose = require('mongoose')

const ProductPhotoSchema = mongoose.Schema({
    
    ProductImage: { 
        data: Buffer,
        contentType: String
    },
    
}, {
    timestamps: true
})

module.exports = mongoose.model('ProductPhoto', ProductPhotoSchema)
