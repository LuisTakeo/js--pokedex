
class Pokemon {
    number;
    name;
    type;
    types = [];
    stats = [];
    photo;
    height;
    weight;
    abilities = [];


    constructor(number, name, types, type, photo, stats, height, weight, abilities){
        this.number = number;
        this.name = name;
        this.types = types;
        this.type = type;
        this.photo = photo;
        this.stats = stats;
        this.height = height;
        this.weight = weight;
        this.abilities = abilities;
    }
}
