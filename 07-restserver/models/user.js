const { Schema, model} = require('mongoose');


const userSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'Name is required']

    },
    correo: {
        type: String,
        required: [true, 'Email is required'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'Password is required']

    },
    img: {
        type: String,

    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']

    },
    estado: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false
    }

});




module.exports = model('User', userSchema);