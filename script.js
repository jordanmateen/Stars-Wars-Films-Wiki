window.addEventListener('DOMContentLoaded', async ()=>{
    let filmData; 
    let films = document.getElementById('sw-films')
    console.log("Star Wars Films Site")

    await fetch('https://swapi.dev/api/films').then((resp)=>{
        return resp.json()
    }).then(data => {
        filmData = data
    })

    films.innerHTML = renderFilms(filmData.results)
    
});

const renderFilms = (filmsArray)=>{
    return filmsArray.map((film)=>{
        const characters = film.characters;
        return `<div onclick="renderCharacters('${characters}');" class="film-title">${film.title}</div>`
    }).join('')
}

function renderCharacters(characters){
    console.log(characters.split(','));
}

