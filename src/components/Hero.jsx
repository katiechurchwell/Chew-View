import Container from "react-bootstrap/Container";
import icecream from "../assets/img/ice-cream.svg"

function Hero() {
  return (
    <Container>
      <svg id="blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FFFFFF"
          d="M41.4,-54.5C56.4,-46.1,73.1,-37.6,76.5,-25.3C79.9,-12.9,70.1,3.3,60.3,15.3C50.5,27.3,40.8,35.1,30.8,42.2C20.8,49.4,10.4,55.9,-2.3,59C-14.9,62.2,-29.8,61.9,-40.8,55C-51.7,48.2,-58.7,34.8,-65.9,19.7C-73.1,4.7,-80.6,-12,-79.2,-28.7C-77.8,-45.4,-67.6,-62.2,-53,-70.7C-38.3,-79.2,-19.1,-79.4,-3,-75.3C13.2,-71.2,26.4,-62.9,41.4,-54.5Z"
          transform="translate(100 100)"
        />
      </svg>
      <img
        className="hero"
        src={icecream}
        alt="A person having fun holding a giant ice-cream cone!"
      />
      <h1>Take the guesswork out of date night</h1>
      <p>Generate a local restaurant and movie to stream tonight!</p>
    </Container>
  );
}

export default Hero;
