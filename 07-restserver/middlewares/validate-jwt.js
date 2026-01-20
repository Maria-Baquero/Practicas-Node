const jwt = require('jsonwebtoken');
const {response, request} = require('express');


const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    console.log(token);

    next();
}


module.exports = {
    validateJWT
}