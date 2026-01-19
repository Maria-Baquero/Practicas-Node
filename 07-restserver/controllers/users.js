const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


 




const usersGet = (req = request, res = response) => {

    //leer informacion que viene en la url
    const {q, name, apikey, page, limit} = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        name,
        apikey,
        page, 
        limit
    });
}





const usersPost = async (req, res = response) => {


    //leer informacion json que viene en el body, peticion post
    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});


    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();  //esto genera las vueltas que va a dar la contraseña para encriptarse, por defecto suele ser 10 
    //ahora hacemos el hash
    user.password = bcryptjs.hashSync(password, salt);


    //Guardar en BD
    await user.save();

    res.json({
        
        user
    });
}








const usersPut = async(req, res = response) => {

    const { id }= req.params;

    //aqui excluimos los datos que no necesitamos o no queremos en este momento
    const { password, google, ...data} = req.body;


    //validar con base de datos
    //si en los datos viene la contraseña la volvemos a encriptar
    if(password){
        const salt = bcryptjs.genSaltSync(); 
        data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, data);

    res.json({
        msg: 'put API - controller',
        user
    });
}





const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}



const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}