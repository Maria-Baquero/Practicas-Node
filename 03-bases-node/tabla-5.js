//Uso de writeFile de fs para crear un archivo de texto

const fs = require('fs');


console.clear();

const base = 5;
let salida = '';

for (let i = 1; i <= 10; i++) {
  salida += `${base} x ${i} = ${base * i}\n`;
}

console.log(salida);


//Creamos un archivo de texto con la tabla de multiplicar
fs.writeFile(`tabla-${base}.txt`, salida, (err) => {
  if (err) throw err;
  console.log(`Tabla del ${base} creada`);
});