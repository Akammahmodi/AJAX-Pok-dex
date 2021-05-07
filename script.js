const pokedex = document.getElementById('pokedex');

/*Fetch Pokemon Data using the PokeAPI
-Create an empty array to hold the promises
-Iterate 1-150
-Make the API request which returns a promise
-Add that promise to the promises array
-Use Promise.all() to wait for all requests to finish (in parallel)
*/
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    //Converting the Pokemon Data
    //Using the Array.map() function to handle this conversion
    //Display Pokemon Data
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

//Creating Card
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    pokedex.innerHTML = pokemon
        .map(
            (Pokemon) => `
        <li class="card">
            <img class="card-image" src="${Pokemon.image}" alt=""/>
            <h2 class="card-title">${Pokemon.id}. ${Pokemon.name}</h2>
            <p class="card-subtitle">Type: ${Pokemon.type}</p>
        </li>
    `
        )
        .join('');
};

fetchPokemon();
