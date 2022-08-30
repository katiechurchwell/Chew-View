const movieGenreById = [
  { name: "Action", id: 28 },
  { name: "Adventure", id: 12 },
  { name: "Animation", id: 16 },
  { name: "Comedy", id: 35 },
  { name: "Crime", id: 80 },
  { name: "Documentary", id: 99 },
  { name: "Drama", id: 18 },
  { name: "Family", id: 10751 },
  { name: "Fantasy", id: 14 },
  { name: "History", id: 36 },
  { name: "Horror", id: 27 },
  { name: "Music", id: 10402 },
  { name: "Mystery", id: 9648 },
  { name: "Romance", id: 10749 },
  { name: "Science Fiction", id: 878 },
  { name: "Thriller", id: 53 },
  { name: "TV Movie", id: 10770 },
  { name: "War", id: 10752 },
  { name: "Western", id: 37 },
];

export function getMovieGenreNames(movieData) {
  //create new array of genre ids from movieData (unique and destructured)
  const genreIds = [
    ...new Set(movieData.results.map((movie) => movie.genre_ids).flat()),
  ];
  //match to genre names
  const matches = movieGenreById.filter((movie) => genreIds.includes(movie.id));
  //return names only
  return matches.map((movie) => movie.name);
}