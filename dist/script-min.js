let pokemonRepository = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(t) {
    'object' == typeof t && 'name' in t && 'detailsUrl' in t
      ? e.push(t)
      : console.log('incorrect');
  }
  function o(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = []);
        for (let n = 0; n < t.types.length; n++)
          e.types.push(t.types[n].type.name);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function i(e) {
    let t = document.querySelector('.modal-body'),
      n = document.querySelector('.modal-title'),
      o = document.createElement('h1');
    o.innerText = e.name;
    let i = document.createElement('p');
    i.innerText = 'height =' + e.height;
    let l = document.createElement('p');
    l.innerText = 'type =' + e.types;
    let r = document.createElement('img');
    r.classList.add('image-class'),
      r.setAttribute('src', e.imageUrl),
      (n.innerHTML = ''),
      (t.innerHTML = ''),
      n.appendChild(o),
      t.appendChild(i),
      t.appendChild(l),
      t.appendChild(r);
  }
  return {
    add: n,
    getAll: function() {
      return e;
    },
    addListItem: function(e) {
      let t = document.querySelector('.list-group'),
        n = document.createElement('li'),
        l = document.createElement('btn');
      n.classList.add('group-list-item'),
        (l.innerText = e.name),
        l.classList.add('btn'),
        l.setAttribute('data-toggle', 'modal'),
        l.setAttribute('data-target', '#exampleModal'),
        l.addEventListener('click', function() {
          var t;
          o((t = e)).then(function() {
            i(t);
          });
        }),
        n.appendChild(l),
        t.appendChild(n);
    },
    loadList: function() {
      return fetch(t)
        .then(function(e) {
          return e.json();
        })
        .then(function(e) {
          e.results.forEach(function(e) {
            n({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    loadDetails: o,
    showModal: i
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
