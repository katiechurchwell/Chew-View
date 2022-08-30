import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { getMovieGenreNames } from "../utilities/helpers";

function Movie() {
  const [loading, setLoading] = useState();
  const [movies, setMovies] = useState([]);
  const movieApiKey = "2e30e0c5c0a8e70c539fdbad775c4919";

  //DISPLAY MOVIE GENRES
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}&language=en-US&page=1`
    ).then(function (response) {
      if (response.ok) {
        response.json().then(async function (movieData) {
          const movieGenres = await getMovieGenreNames(movieData);
          setMovies(movieGenres);
          setLoading(false);
        });
      } else {
        console.log("response is not ok");
      }
    });
  }, []);

  //map from movies
  const movieItems = movies.map((movie) => (
    <ListGroup.Item>{movie}</ListGroup.Item>
  ));
  return <ListGroup>{movieItems}</ListGroup>;
}

export default Movie;
