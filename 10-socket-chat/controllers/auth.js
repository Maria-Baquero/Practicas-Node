const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');





//login con email y password
const login = async (req, res = response) => {


    const { email, password } = req.body;

    try {

        //verificar email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Email is invalid'
            })
        }


        //verificar usuario activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'user innactive'
            })
        }

        //verificar contraseña
        const existPassword = bcryptjs.compareSync(password, user.password);
        if (!existPassword) {
            return res.status(400).json({
                msg: 'Password is invalid'
            })
        }


        //generar JWT
        const token = await generateJWT(user.id);



        res.json({
            user,
            token
        })


    } catch (error) {

        res.status(500).json({
            msg: 'Contact your system administrator'
        });
    }

}





//login con google
const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        //const googleUser = await googleVerify(id_token);
        //console.log(googleUser);


        const { email, name, img } = await googleVerify(id_token);

        let user = await User.findOne({ email });


        if (!user) {
            const data = {
                name, email, password: 'P',
                img, google: true
            };

            user = new User(data);
            await user.save();
        }


        if(!user.status){
            return res.status(401).json({
                msg: 'Call the administrator, user blocked'
            })
        }


        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        })


    } catch (error) {
        res.status(400).json({
            msg: "token invalid"
        })
    }
}


//renovar token de usuario
const renewToken = async (req, res = response) => {
    const { user } = req;

    //generar nuevo JWT
    const token = await generateJWT(user.id);
    
    res.json({
        user,
        token
    })
}   


module.exports = {
    login,
    googleSignIn,
    renewToken
}