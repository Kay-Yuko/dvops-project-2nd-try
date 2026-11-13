const { randomUUID } = require('crypto');

class Resource {
    constructor(name, age, description, image, gender, status, species, breed) {
        this.name = name;
        this.age = age;
        this.description = description;
        this.image = image;
        this.gender = gender;
        this.status = status;
        this.species = species;
        this.breed = breed;
        this.id = randomUUID();
    }
}

module.exports = { Resource };