
class Usuarios {


    constructor() {
        this.personas = [];

    }


    // Add persona
    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return persona;
    }


    // Get persona
    getPersona(id){
        let persona = this.personas.filter( persona => persona.id === id )[0];
        return persona;
    }


    // Get all personas
    getPersonas(){
        return this.personas;
    }


    // Get personas for sala
    getPersonasPorSala( sala ){

        let personasEnSala = this.personas.filter( persona => persona.sala === sala );
        return personasEnSala;
    }


    // Delete persona
    borrarPersona( id ){

        let personaBorrada = this.getPersona( id );

        this.personas = this.personas.filter(persona => persona.id !== id );
        return personaBorrada;
    }

    
}



module.exports = { Usuarios };