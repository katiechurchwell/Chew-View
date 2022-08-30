import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";

function Movie() {
  const [loading, setLoading] = useState();
  const [movieGenres, setMovieGenres] = useState();

  //DISPLAY MOVIE GENRES
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=2e30e0c5c0a8e70c539fdbad775c4919&language=en-US`
    ).then(function (response) {
      if (response.ok) {
        response.json().then(function (genreData) {
          setMovieGenres(genreData);
          setLoading(false);
        });
      } else {
        console.log("response is not ok");
      }
    });
  }, []);

  console.log(movieGenres);

  return (
    <ListGroup>
      <ListGroup.Item>MOVIE1</ListGroup.Item>
      <ListGroup.Item>MOVIE2</ListGroup.Item>
      <ListGroup.Item>MOVIE3</ListGroup.Item>
    </ListGroup>
  );
}

export default Movie;
