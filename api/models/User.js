//MOdels users
import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    rol: {type: String, required: true, maxlength: 30},
    name: {type: String, required: true, maxlength: 250},
    surname: {type: String, required: false, maxlength: 250},
    email: {type: String, required: true, maxlength: 250, unique: true},
    password: {type: String, required: true, maxlength: 250},
    avatar: {type: String, required: false, maxlength: 250},
    state: {type: Number,default: 1}, //1 Activo, 2 Inactivo
    phone: {type: String, required: false, maxlength: 20},
    birthday: {type: Date, required: false},
}, {timestamps: true});

const User = mongoose.model('user', UserSchema);

export default User;

