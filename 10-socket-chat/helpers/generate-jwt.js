const jwt = require('jsonwebtoken');
const { User } = require('../models');


//uid = user identified = id del usuario
const generateJWT = (uid = '') => {

    return new Promise( (resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.SECRET_KEY, {
                //expiresIn: '4h'   //expiracion del token
        }, (error, token)=>{

            if(error){
                console.log(error);
                reject('An error occurred while generating the token.')
            }else{
                resolve(token);
            }

        })

    })

}





//comprobar JWT
const checkJWT = async ( token = '' ) => {

    try{

        if( token.length < 10 ){
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(uid);

        if( user ){
            
            return user;
            
        }else{
            return null;
        }



    }catch(err){

        return null;
    }
}


module.exports = {
    generateJWT,
    checkJWT
}