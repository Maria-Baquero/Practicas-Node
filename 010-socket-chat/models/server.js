const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {createServer} = require('http');

const { dbCon } = require('../database/config');
const { socketController } = require('../sockets/socketController');

class Server {


    constructor(){
        this.app = express(); 
        this.port = process.env.PORT;

        //configuracion socket.io
        this.server = createServer( this.app ); //el servidor de express no tiene socket por eso usamos io
        this.io = require('socket.io')(this.server);



        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search/',
            uploads: '/api/uploads'
        }
       

        //conectar DB
        this.connectDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();

        //sockets
        this.sockets();
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

        //fileupload - carga de archivos
        this.app.use(fileUpload ({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true   //esta linea sirve para permitir a fileUpload crear carpetas si no existen
        }));
    }


    routes(){

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.users , require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/searches'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }




    sockets(){

        this.io.on('connection', socketController);

    }







    listen(){
        this.server.listen(this.port, () => {
        console.log('Server-port: ', process.env.PORT)
        });
    }


}


module.exports = Server;