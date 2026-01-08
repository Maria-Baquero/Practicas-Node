const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regenaracion',
    getNombre() {
        return `${this.nombre} ${this.apellido} ${this.poder}`;
    }
}

console.log(deadpool.getNombre() );



//----------------------------------------
//const nombre = deadpool.nombre;
//const apellido = deadpool.apellido;
//const poder = deadpool.poder;

const {nombre, apellido, poder} = deadpool;

console.log(nombre, apellido, poder);



//----------------------------------------
function imprimeHeroe( heroe ){
    const {nombre, apellido, poder} = heroe;
    console.log(nombre, apellido, poder);
}

imprimeHeroe (deadpool);




//------------------------------------------
function imprimirHeroe( {nombre, apellido, poder} ){
    nombre = 'Fernando';
    console.log(nombre, apellido, poder);
}

imprimirHeroe (deadpool);   //se cambia el nombre a fernando




//--------------------------------------------
const heroes = ['Deadpool', 'Superman', 'Batman'];

//const h1 = heroes[0];
//const h2 = heroes[1];
//const h3 = heroes[2];

const [h1, h2, h3] = heroes;

console.log(h1, h2, h3);











