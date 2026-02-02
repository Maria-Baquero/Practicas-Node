import { Request, Response } from "express";
import User from "../models/user";


// Obtener usuarios
export const getUsers = async(req: Request, res:Response) => {

    // const users = await User.findAll({ where: { status: true } });
    const users = await User.findAll();

    res.json({
        users
    });
}






// Obtener usuario por ID
export const getUser = async(req: Request, res:Response) => {

    const { id } = req.params;

    const user = await User.findByPk(Number(req.params.id));

    if (user) {
        res.json({
            user
        });
    } else {
        res.status(404).json({
            msg: `This id doesn't exist ${id}`
        });
    }

}






// Crear usuario
export const postUser = async(req: Request, res:Response) => {

    const { body } = req;

    try{

        // Verificar si el email existe
        const emailExist = await User.findOne({
            where: {
                email: body.email
            }
        }); 


        //si el email existe retornar error
        if(emailExist){
                return  res.status(400).json({ 
                msg: 'There is already a user with email ' + body.email
            });
        }


        //crear usuario
        const user = await User.build(body);
        await user.save();


        res.json({ 
            user
        });



    }catch(error){
        console.log(error);
        res.status(500).json({ 
            msg: 'Talk to the administrator'
        });
    }

}







// Actualizar usuario
export const putUser = async (req: Request, res:Response) => {

    const {id} = req.params;
    const { body } = req;


    try{
       // Verificar si el usuario existe
       const user = await User.findByPk( Number( id ) );

       //si no existe retornar error
        if(!user){
            return res.status(404).json({ 
                msg: 'This id does not exist ' + id
            });
        }

        //actualizar usuario
        await user.update( body );

        res.json({ 
            user
        });


    }catch(error){
        console.log(error);
        res.status(500).json({ 
            msg: 'Talk to the administrator'
        });
    }
}








// Borrar usuario
export const deleteUser = async (req: Request, res:Response) => {

    const {id} = req.params;

    const user = await User.findByPk( Number( id ) );

    //si no existe retornar error
    if(!user){
        return res.status(404).json({
            msg: 'This id does not exist ' + id
        });
    }

    //actualizamos el estado a false
    await user.update({ state: false });

    //borrado usuario
    //await user.destroy();


    res.json({
        user
    });
}