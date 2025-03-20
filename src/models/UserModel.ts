import mongoose, { Schema } from "mongoose";

const UserScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rule: {
        type: Number,
        default: 1
    }
}, { timestamps: true })

const UserModel = mongoose.model('User', UserScheme);

export default UserModel;
