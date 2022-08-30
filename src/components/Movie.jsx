import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";

function Movie() {
  const [loading, setLoading] = useState();
  const [movies, setMovies] = useState();
  const movieApiKey = "2e30e0c5c0a8e70c539fdbad775c4919";

  //DISPLAY MOVIE GENRES
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}&language=en-US&page=1`
    ).then(function (response) {
      if (response.ok) {
        response.json().then(function (movieData) {
          setMovies(movieData);
          setLoading(false);
        });
      } else {
        console.log("response is not ok");
      }
    });
  }, []);

  console.log(movies);

  return (
    <ListGroup>
      <ListGroup.Item>MOVIE1</ListGroup.Item>
      <ListGroup.Item>MOVIE2</ListGroup.Item>
      <ListGroup.Item>MOVIE3</ListGroup.Item>
    </ListGroup>
  );
}

export default Movie;
