import app from './global/app';

app.getMoviesTodayTrends = async function (page = app.currentPage) {
  const galleryULElement = document.getElementById(
    app.MOVIE_CARDS_PARENT_ELEMENT_ID
  );

  const movies = await app.api.get('trending/movie/day');
  const movieCards = await app.showMovieCards(movies);

  galleryULElement.insertAdjacentHTML('afterbegin', movieCards);
};

app.renderMovieCardHTML = async function (movieId) {
  const movieObject = await app.api.get('movie/' + movieId);
   const poster = movieObject.poster_path;
   const posterUrl = 'https://image.tmdb.org/t/p/w500';
  const movieGenres = [];

  for (const genre of movieObject.genres) {
    movieGenres.push(genre.name);
  }
  const movieYear = movieObject.release_date.split('-')[0];
  const title = movieObject.original_title;
  const votes = movieObject.vote_average;
  const popularity = movieObject.popularity;
  const about = movieObject.overview;

  return `
   <li class = "movie-card">
       <div class="movie-thumb">
        <img class="movie-image" src="${posterUrl}${poster}" alt="Poster image" loading="lazy" />
       </div>
      <div class="movie-info">
        <p class="movie-name">${title}</p>
        <p class="movie-genres">${movieGenres} | ${movieYear}</p>
      </div>
    </li>`;
};

app.showMovieCards = async function (moviesArray) {
  let html = '';

  for (const movie of moviesArray.results) {
    html += await app.renderMovieCardHTML(movie.id);
  }

  return html;
};

app.getMoviesTodayTrends();
