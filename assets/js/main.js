const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const showPokemon = document.getElementById('showPokemon');
let pokemons;

const maxRecords = 250;
const limit = 25;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function convertPokemonToDetail(pokemon) {
    return `
        <div class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
               
                <ol class="types">

                    
                    <li>Height: ${pokemon.height.toFixed(2)}m </li>
                    <li>Weight: ${pokemon.weight}kg </li>
                    ${pokemon.stats.map(stat => {
                        const {name, base_stat: value} = stat;
                        return `<li>${name}: ${value} </li> `
                    }).join('')}
                    
                    
                    <li>
                        Abilities: ${pokemon.abilities.map(ability => ability).join(' - ')}
                    </li>

                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </div>
    `;
}

function mostraPokemon(pokemon){

    pokemon.addEventListener('click', () => {
        let numero = parseInt(pokemon
            .getElementsByClassName('number')[0]
            .innerHTML
        .replace('#', ''));

        pokeApi.getPokemons(numero - 1, 1)
            .then((pokemon = []) => showPokemon.innerHTML = pokemon.map(
                convertPokemonToDetail).join()
            )
    }) 
    
}


async function loadPokemonItens(offset, limit) {
    await pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        
    })
    .finally(() => {
        pokemons = document.querySelectorAll(".pokemon")
        // console.log(pokemons)
        pokemons.forEach(pokemon => {
            // console.log(pokemon)
            mostraPokemon(pokemon);
        })
    })
}


loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})