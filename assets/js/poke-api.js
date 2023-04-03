
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    console.log(pokeDetail);
    const { id: number, name } = pokeDetail;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const photo = pokeDetail.sprites.other.dream_world.front_default

    const pokemon = new Pokemon(number, name, types, type, photo)
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
        .then(jsonBody => {
            console.log(jsonBody)
            return jsonBody.results})
        .then(pokemons => {
            console.log(pokemons)
            return pokemons.map(pokeApi.getPokemonDetail)})
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonsDetails => pokemonsDetails)
}
