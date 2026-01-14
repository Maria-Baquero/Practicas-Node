const express = require('express');
const app = express();
const path = require('path');


//Contenido estatico
//uso de middleware (uso de la carpeta public) 
app.use(express.static('public'));


//pagina  principal
app.get('/', (req, res) => {
    res.send('home page!');
})



app.get('/hola-mundo', function(req, res){
    res.send('Hola mundo en su ruta');
});



//no se encuentra la ruta
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});



app.listen(8080);