/* initializing variables from html */
const tally = document.querySelector(".tally");
const minusButton = document.querySelector(".minus");
const plusButton = document.querySelector(".plus");
const reset = document.querySelector(".reset");
const dropdown = document.getElementById("dropdown");
const select = document.getElementById("select");
let pkmnName = document.querySelector(".pkmnName");
const pokemonImage = document.getElementById("pokemon-img");
const pokeN = document.querySelector(".pokeN");


/* adding event listeners to buttons */
let counter = 0;
plusButton.addEventListener("click", () => {
    counter++;
    tally.textContent = counter;
});
minusButton.addEventListener("click", () => {
    counter--;
    tally.textContent = counter;
});
reset.addEventListener("click", () => {
    counter = 0;
    tally.textContent = counter;
});

/* getting pokemon data from pokemon api*/
const pokemonCount = 1010;
let pokedex = {};
let dropList = pokemonCount
let dropListLength = dropdown.length;

window.onload = async function() {
    for(let i=1;i < pokemonCount;i++) {
        await getPokemon(i);
        let pokemon = document.createElement("div");
        let pokeman = document.createElement("option");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"]
            .toUpperCase();
        pokemon.classList.add("pokemon-name");
        document.getElementById("pokemon-list").append(pokemon);  
        
        //add pokemon to dropwdown
        pokeman.innerText = pokedex[i]["name"].toUpperCase();
        select.appendChild(pokeman);
        pokeman.classList.add("pokeN");
        
    };
};


async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonImage = pokemon["sprites"]["front_shiny"];
    

    pokedex[num] = {"name": pokemonName, "image": pokemonImage}    
};

console.log(pokedex);

function handleDropdownChange () {
    const selectedOptionValue = select.value;
    pkmnName.textContent = selectedOptionValue;
}

select.addEventListener("change", handleDropdownChange);

async function pokemonImageChange () {
    const selectedOptionValue = select.value.toLowerCase();
    const pokeUrl = "https://pokeapi.co/api/v2/pokemon/"
    const pokemonUrl = `${pokeUrl}${selectedOptionValue}`;

    try {
        const response = await fetch(pokemonUrl);
        const data = await response.json();
        const imageUrl = data["sprites"]["front_shiny"];

        pokemonImage.src = imageUrl;
} catch (error){
    console.log("error", error);
    }
}

select.addEventListener('change', pokemonImageChange);