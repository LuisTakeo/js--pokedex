
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {

    const { id: number, name, height, weight } = pokeDetail;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const photo = pokeDetail.sprites.other.dream_world.front_default

    const abilities = pokeDetail.abilities.map(ability => ability.ability.name);
    
    const stats = pokeDetail.stats.map(stat => {
        const {name} = stat.stat;
        const {base_stat} = stat;
        return {name, base_stat}
    })
    const pokemon = new Pokemon(number, name, types, type, photo, stats, height / 10, weight, abilities)
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => {
            // console.log(pokemons)
            return pokemons.map(pokeApi.getPokemonDetail)})
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonsDetails => pokemonsDetails)
}
