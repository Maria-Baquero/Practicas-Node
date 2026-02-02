import express, { Application} from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';
import db from '../db/connection';




class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    };



    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';


        this.dbConnect();

        this.middlewares();

        this.routes();
    }





    async dbConnect(){
        try{

            await db.authenticate();
            console.log('DataBase Online');


        }catch(error){
            console.log(error);
        }
    }








    middlewares() {

        //cors
        this.app.use( cors() );

        //lectura del body
        this.app.use( express.json() );


        //carpeta publica
        this.app.use( express.static('public') );
    }






    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }





    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });

    }

}



export default Server;