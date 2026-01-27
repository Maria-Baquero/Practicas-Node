const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');



class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);  //esto es de socket.io
        this.io = require('socket.io')(this.server);

        this.paths = { };
       

        //middlewares
        this.middlewares();

        //rutas
        this.routes();

        //sockets
        this.sockets();
    }



    middlewares(){
        this.app.use(cors());

        //directorio publico
        this.app.use(express.static('public'));

    }




    routes(){
       
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