const { response, request } = require('express');


const usersGet = (req = request, res = response) => {

    //leer informacion que viene en la url
    const {q, nombre, apikey, page, limit} = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}


const usersPost = (req, res = response) => {

    //leer informacion json que viene en el body, peticion post
    const {nombre, edad}= req.body;

    res.status(200).json({
        msg: 'post API - controller',
        nombre, 
        edad
    });
}


const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controller',
        id
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