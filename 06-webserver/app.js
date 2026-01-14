const express = require('express');
const hbs = require('hbs');

const app = express();


//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials', function (err) {});


//RUTAS

//Contenido estatico
//uso de middleware (uso de la carpeta public) 
app.use(express.static('public'));


//pagina  principal
app.get('/', (req, res) => {
    //mandamos la vista home renderizada a la ruta home
        //con render podemos pasar un segundo argumento que son las opciones, donde pueden ir datos
    res.render('home', {
        nombre: 'Maria Baquero',
        titulo: 'Course Node'
    });
})



app.get('/generic', function(req, res){
    res.render('generic', {
        nombre: 'Maria Baquero',
        titulo: 'Course Node'
    });
});


app.get('/elements', function(req, res){
    res.render('elements', {
        nombre: 'Maria Baquero',
        titulo: 'Course Node'
    });
});


//no se encuentra la ruta mandamos mensaje 404
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});



app.listen(8080);