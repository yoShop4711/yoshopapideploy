const  mongoose = require('mongoose')

const UserPhotoSchema = mongoose.Schema({
    
    UserImage: { 
        data: Buffer,
        contentType: String
    },
    
}, {
    timestamps: true
})

module.exports = mongoose.model('UserProfilePhoto', UserPhotoSchema)
