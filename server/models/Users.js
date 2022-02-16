const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    likedQuizzes: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    avatar: {
        type: Object,
        required: false,
        contains: {
            url: {
                type: String
            },
            publicId: {
                type: String
            }
        }
    },
    images: [{
        type: Object,
        contains: {
            url: {type: String},
            publicId: {type: String}
        }
    }],
    deleted: {
        type: Boolean,
        default: false
    },
    role:{
        default:"user",
        type:String
    }
})

module.exports = User = mongoose.model('Users', UserSchema);

