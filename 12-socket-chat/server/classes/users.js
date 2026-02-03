
class Users {


    constructor() {
        this.persons = [];

    }


    // Add person
    addPerson(id, name, hall) {
        let person = { id, name, hall };
        this.persons.push(person);
        return person;
    }


    // Get person
    getPerson(id){
        let person = this.persons.filter( person => person.id === id )[0];
        return person;
    }


    // Get all persons
    getPersons(){
        return this.persons;
    }


    // Get persons for hall
    getPersonForHall( hall ){

        let personsHall = this.persons.filter( person => person.hall === hall );
        return personsHall;
    }


    // Delete person
    deletePerson( id ){

        let deletePerson = this.getPerson( id );

        this.persons = this.persons.filter(persons => persons.id !== id );
        return deletePerson;
    }

    
}



module.exports = { Users };