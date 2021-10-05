// Elements DOM
var elList = document.querySelector('.list');
var elForm = document.querySelector('.form');
var elSelect = document.querySelector('.form__select');
var elSearch = document.querySelector('.search');
var elSort = document.querySelector(".select__sort");

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

const sortFns = {
   0: (a, b)=>{
      if (a.title < b.title) {
         return -1
      }

      if (a.title > b.title) {
         return 1
      }

      return 0
   },

   1: (a, b)=>{
      if (a.title < b.title) {
         return 1
      }

      if (a.title > b.title) {
         return -1
      }

      return 0
   },

   2 : (a, b)=> a.release_date - b.release_date,

   3 : (a, b)=>  b.release_date - a.release_date,
}

// Films
function renderFilms(arr, node) {

   elList.innerHTML = null;

	arr.forEach((film) => {
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

	);
}

//form 
elForm.addEventListener('submit', (evt) => {
   
   evt.preventDefault();
   
   const genreValue = elSelect.value;
   const searchValue = elSearch.value;
   const sortValue = elSort.value;

   const newRegx = new RegExp(searchValue, 'gi');
   
   let filterFilms = []; 
   
   if ( genreValue === 'all') {

      filterFilms = films.filter((movie)=> movie.title.match(newRegx))
   
   } else {
      
      filterFilms = films
      .filter((film)=> film.genres.includes(genreValue)) 
      .filter((movie)=> movie.title.match(newRegx))

   };

   filterFilms.sort(sortFns[sortValue])


   renderFilms(filterFilms, elList);
})

renderFilms(films, elList);