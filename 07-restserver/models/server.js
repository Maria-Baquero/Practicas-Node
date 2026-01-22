const express = require('express');
const cors = require('cors');


const { dbCon } = require('../database/config');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories'
        }
       

        //conectar DB
        this.connectDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }
    


    async connectDB(){
        await dbCon();
    }




    middlewares(){
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.users , require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
    }



    listen(){
        this.app.listen(this.port, () => {
        console.log('Server-port: ', process.env.PORT)
        });
    }


}


module.exports = Server;