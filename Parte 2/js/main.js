const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemon = [];  // Array para guardar todos los Pokémon

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then(response => response.json())
        .then(data => {
            allPokemon.push(data); // Agregar pokemon al array
            if (allPokemon.length === 151) { // Si se han obtenido todos los Pokémon
                allPokemon.sort((a, b) => a.id - b.id); // Ordenar por ID
                allPokemon.forEach(pokemon => mostrarPokemon(pokemon)); // Mostrar en orden
            }
        });
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');
    
    let pokeId = poke.id.toString().padStart(3, '0'); // Asegurarse de que el ID tenga 3 dígitos
    
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";

    let filteredPokemon;
    if (botonId === "ver-todos") {
        filteredPokemon = allPokemon;
    } else {
        filteredPokemon = allPokemon.filter(pokemon =>
            pokemon.types.some(type => type.type.name.includes(botonId))
        );
    }

    filteredPokemon.forEach(pokemon => mostrarPokemon(pokemon));
}));
