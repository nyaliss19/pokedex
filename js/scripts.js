let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("incorrect");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function addListItem(pokemon) {
    // previous version
    let mainList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    let button = document.createElement("btn");
    listItem.classList.add("group-list-item");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    mainList.appendChild(listItem);
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //modal
  function showModal(pokemon) {
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeader = document.querySelector(".modal-header");

    //add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X";

    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "height =" + pokemon.height;

    let secondElement = document.createElement("p");
    secondElement.innerText = "type =" + pokemon.types;

    let imageElement = document.createElement("img");
    imageElement.classList.add("image-class");
    imageElement.setAttribute("src", pokemon.imageUrl);

    modalTitle.appendChild(titleElement);
    modalBody.appendChild(closeButtonElement);
    modalBody.appendChild(contentElement);
    modalBody.appendChild(secondElement);
    modalBody.appendChild(imageElement);

    //previous version
    // let modalBody = document.createElement("div");
    // modalBody.classList.add("modal");
    //
    // //add the new modal content
    // let closeButtonElement = document.createElement("button");
    // closeButtonElement.classList.add("modal-close");
    // closeButtonElement.innerText = "X";
    //
    // let titleElement = document.createElement("h1");
    // titleElement.innerText = pokemon.name;
    //
    // let contentElement = document.createElement("p");
    // contentElement.innerText = "height =" + pokemon.height;
    //
    // let secondElement = document.createElement("p");
    // secondElement.innerText = "type =" + pokemon.types;
    //
    // let imageElement = document.createElement("img");
    // imageElement.classList.add("image-class");
    // imageElement.setAttribute("src", pokemon.imageUrl);
    //
    // modalBody.appendChild(closeButtonElement);
    // modalBody.appendChild(titleElement);
    // modalBody.appendChild(contentElement);
    // modalBody.appendChild(secondElement);
    // modalBody.appendChild(imageElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
