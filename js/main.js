// Elements DOM
var elList = document.querySelector('.list');
var elForm = document.querySelector('.form');
var elSelect= document.querySelector('.form__select');

elList.innerHTML = null;


// Select genres
   var resultGenre =[]

   for (var film of 	films) {
		for (var ganre of film.genres) {
			if (!resultGenre.includes(ganre)) {
				resultGenre.push(ganre);
			}
		}
	}



for (var option of resultGenre) {
	
	var elOption = document.createElement('option');
	elOption.value = option;
	elOption.textContent = option;

	elSelect.appendChild(elOption)
}


// Films
function renderFilms(arr, node) {

   elList.innerHTML = null;

	arr.forEach((film) => {
      if(film.genres.includes(elSelect.value)){
         var newLi = document.createElement('li');
         var newHeading = document.createElement('h3');
         var newImage = document.createElement('img');
         var newParagraph = document.createElement('p');
         var newTime = document.createElement('time');
         var newGenreList = document.createElement('ul');
     
         newHeading.textContent = film.title;
         newParagraph.textContent =
           film.overview.split(' ').slice(0, 20).join(' ') +'...';
         newTime.textContent = normalizeDate(film.release_date);
     
         for (var genre of film.genres) {
           var newGenreLi = document.createElement('li');
           newGenreLi.setAttribute('class', 'genre__item');

           newGenreLi.textContent = genre;
           newGenreList.appendChild(newGenreLi);
         }

         newLi.setAttribute('class', 'list__item');

         newHeading.setAttribute('class', 'film__heading');

         newParagraph.setAttribute('class', 'film__info')

         newImage.setAttribute('class', 'film__image');
         newImage.setAttribute('src', film.poster);
         newImage.setAttribute('alt', film.title + ' poster');   
         newImage.setAttribute('width', '300');
         newImage.setAttribute('height', '300');

         newGenreList.setAttribute('class', 'genre__list');
        
         newTime.setAttribute('class', 'date')

         newLi.appendChild(newImage);
         newLi.appendChild(newHeading);      
         newLi.appendChild(newParagraph);
         newLi.appendChild(newGenreList);
         newLi.appendChild(newTime);
   
         node.appendChild(newLi);
      }

	});
}

renderFilms(films, elList);


//form 
elForm.addEventListener('submit', (evt) => {
   
   evt.preventDefault();
   
   renderFilms(films, elList);

})