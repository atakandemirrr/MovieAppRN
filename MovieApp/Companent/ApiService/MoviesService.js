// MoviesService.js
import { getMoviesFromWatchlist } from '../Data/MoviesToWatchCRUD';

const API_KEY = 'd3eb1f3a3293b93da5d5886f20430ace';
const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_HEADER = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2ViMWYzYTMyOTNiOTNkYTVkNTg4NmYyMDQzMGFjZSIsIm5iZiI6MTcyMTIxOTE5MC43NTMwMTEsInN1YiI6IjY2OTc4Y2VjNGFlNjM1NWQxYjBjZWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZVvQmzp4mA1rVtSNa4I5yfj5RknPx5eM6F2LsLRJx4I`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AUTH_HEADER,
  },
};

const fetchMoviesByIds = async (movieIds) => {
  try {
    const moviePromises = movieIds.map(id =>
      fetch(`${BASE_URL}/movie/${id}?language=tr`, options)
    );
    const responses = await Promise.all(moviePromises);
    return await Promise.all(responses.map(response => response.json()));
  } catch (error) {
    console.error('Error fetching movies by IDs:', error);
    throw error;
  }
};

const fetchMoviesByGenre = async (genreId) => {
  try {
    let apiUrl = genreId === 0 
      ? `${BASE_URL}/movie/popular?language=tr-US&page=1` 
      : `${BASE_URL}/discover/movie?with_genres=${genreId}&language=tr&page=1`;

    const response = await fetch(apiUrl, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

const getMovies = async (genreId) => {
  try {
    if (genreId === -1) {
      const favoriteMovies = await getMoviesFromWatchlist();
      const favoriteMovieIds = favoriteMovies.map(movie => movie.MovieId);
      if (favoriteMovieIds.length > 0) {
        const moviesData = await fetchMoviesByIds(favoriteMovieIds);
        return moviesData.map(movie => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '',
          description: movie.overview,
          rating: movie.vote_average.toString(),
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          isFavorite: true,
        }));
      } else {
        return [];
      }
    } 
    else if (genreId === -2) {
      const apiUrl = `${BASE_URL}/movie/top_rated?language=tr-US&page=1`;
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      
      const favoriteMovies = await getMoviesFromWatchlist();
      const favoriteMovieIds = favoriteMovies.map(movie => movie.MovieId);

      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '',
        description: movie.overview,
        rating: movie.vote_average.toString(),
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        isFavorite: favoriteMovieIds.includes(movie.id),
      }));
    } 
    else if (genreId === -3) {     
      const apiUrl = `${BASE_URL}/trending/movie/day?language=tr`;
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      
      const favoriteMovies = await getMoviesFromWatchlist();
      const favoriteMovieIds = favoriteMovies.map(movie => movie.MovieId);

      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '',
        description: movie.overview,
        rating: movie.vote_average.toString(),
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        isFavorite: favoriteMovieIds.includes(movie.id),
      }));
    } 
    else {
      const data = await fetchMoviesByGenre(genreId);
      const favoriteMovies = await getMoviesFromWatchlist();
      const favoriteMovieIds = favoriteMovies.map(movie => movie.MovieId);
      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '',
        description: movie.overview,
        rating: movie.vote_average.toString(),
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        isFavorite: favoriteMovieIds.includes(movie.id),
      }));
    }
  } catch (error) {
    console.error('Error getting movies:', error);
    throw error;
  }
};

export { getMovies };
