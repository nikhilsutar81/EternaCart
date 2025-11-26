import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    gender: { type: String, default: '' },
    address: { type: Object, default: {} },
    photo: { type: String, default: '' },
    cartData: { type: Object, default: {} }
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;