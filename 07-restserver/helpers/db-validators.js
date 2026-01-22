const {Role, User, Category} = require('../models');


//validamos el rol
const validateRol = async (rol = '') => {

    const existsRol = await Role.findOne({ rol });

    if (!existsRol) {
        throw new Error(`Rol ${rol} is not registered on database`)
    }
}

//verificar si el email existe
const validateEmail = async (email = '') => {
    const existsEmail = await User.findOne({email});
        if (existsEmail){
            throw new Error(`Email: ${email}, is registered`)
        }
}


//comprobamos si existe el id del usuario
const userExistById = async(id) =>{

    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error(`User doesnt exist: ${id}`);
    }
}


//comprobamos si existe el id de la categoria
const categoryExistById = async(id) =>{
    const categoryExist = await Category.findById(id);
    if(!categoryExist){
        throw new Error(`Category doesnt exist: ${id}`)
    }
}




module.exports = {
    validateRol,
    validateEmail,
    userExistById,
    categoryExistById
}