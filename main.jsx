'use strict';

let filmIds = [];
let charactersData;
let filmsData;

getMultiple(CharacterIds, 'people').then(res => {
  charactersData = res.map(r => {
    let character = JSON.parse(r);
    
    character.id = idFromUrl(character.url, 'people');
    return character;
  });
  charactersData.forEach(c => {
    c.filmIds = [];
    c.films.forEach(f => {
      let filmId = idFromUrl(f, 'films');
      
      c.filmIds.push(filmId);
      if (filmIds.indexOf(filmId) === -1) {
        filmIds.push(filmId);
      };
    });
  });
  return getMultiple(filmIds, 'films');
}).then(res => {
  filmsData = res.map(r => {
    let film = JSON.parse(r);
    
    film.id = idFromUrl(film.url, 'films');
    return film;
  })
  ReactDOM.render( <App/>, document.getElementById('js-main'));
})
