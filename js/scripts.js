let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'bulbasaur', height: 2.04, type: ['grass', 'poison'] },
    { name: 'ivysaur', height: 3.03, type: ['grass', 'poison'] },
    { name: 'venusaur', height: 6.07, type: ['grass', 'poison'] },
    { name: 'charmander', height: 2, type: ['fire'] },
    { name: 'charmeleon', height: 3.07, type: ['fire'] },
    { name: 'charizard', height: 5.07, type: ['fire', 'flying'] },
    { name: 'squirtle', height: 1.08, type: ['water'] },
    { name: 'wartortle', height: 3.03, type: ['water'] },
    { name: 'blastoise', height: 5.03, type: ['water'] },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

// // -- JAVASCRIPT --
// let container = document.querySelector('.container');
// container.innerHTML = '<button>Click Me</button>';
// // console.log(container.innerHTML);

// if (pokemon.height > 6) {
//   document.write("<p>" + pokemon.name + " (height : " + pokemon.height + ") - Wow, that's big!");
// }
//
// else {
//   document.write("<p>" + pokemon.name + " (height : " + pokemon.height + ")");

pokemonRepository.getAll().forEach(function (pokemon) {
  let mainList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('pokemon-button');
  listItem.appendChild(button);
  mainList.appendChild(listItem);
});
