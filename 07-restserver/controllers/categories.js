const { response, request }= require('express');
const { Category } = require('../models');





//obtener categorias - paginado  - total categorias - populate
const getCategories = async (req = request, res = response) => {

}


//obtener categoria - populate {}
const getCategory = async (req = request, res = response) => {
    
}



//crear categoria
const createCategory = async (req, res = response) => {

    //leemos el nombre del body
    const name = req.body.name.toUpperCase();

    //buscamos la categoria en la base de datos
    const categoryBD = await Category.findOne({name});

    //si existe mandamos un error
    if(categoryBD){
        return res.status(400).json({
            msg:`Category already exist`
        });
    }

    //generamos la data que vamos a grabar
    const data = {
        name,
        user: req.user._id  //el user debe ser un id de mongoDB y esta validado por un jwt
    }

    //creamos una nueva categoria con la data
    const category = new Category(data);

    //guardamos la categoria nueva
    await category.save();

    //devolvemos respuesta 
    res.status(201).json(category);

}


//actualizar categoria
const putCategory = async (req, res = response) => {
    
}




//eliminar categoria
const deleteCategory = async (req, res = response) => {
    
}





module.exports = {
    createCategory
}