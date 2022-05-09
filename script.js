let films = document.getElementById('sw-films');
let modal = document.getElementById('characterModal');
let modalContentTitle = document.getElementById('title');
let characterList = document.getElementById('modal-content-character-list');
let closeModal = document.getElementById('close-modal');

window.addEventListener('DOMContentLoaded', async ()=>{
    let filmData; 
    films.innerHTML = showLoadingPrompt('films');

    await fetch('https://swapi.dev/api/films').then((resp)=>{
        return resp.json();
    }).then(data => {
        filmData = data
    });

    films.innerHTML = renderFilms(filmData.results);
});

const renderFilms = (filmsArray)=>{
    return filmsArray.map((film)=>{
        const characterUrls = film.characters;
        return `<div onclick="renderCharacters('${characterUrls}','${film.title}');" class="film-title">${film.title}</div>`
    }).join('');
}

const getCharacters = async (characters) => {
    const charactersUrlArray = characters.split(',');
    const characterPromiseArray = charactersUrlArray.map(characterUrl => {
        return fetch(characterUrl).then(resp => resp.json());
    });
    const charactersArray = await Promise.all(characterPromiseArray).then(resp => {
        return resp;
    });
    return charactersArray;

}

const renderCharacters = async (charactersUrl, movieTitle) =>{
    modal.style.display = "block";
    modalContentTitle.innerHTML +=` ${movieTitle}`;
    characterList.innerHTML = showLoadingPrompt('Characters');
    const characterListArray = await getCharacters(charactersUrl);
    const characters = characterListArray.map(character => {
        return `<li>${character.name}</li>`;
    }).join('');

    characterList.innerHTML = characters;
}

const showLoadingPrompt = (itemsToLoad) => {
    return `<h4>Loading ${itemsToLoad}...</h4>`;
}

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// if the user clicks outside the modal close it. 
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}