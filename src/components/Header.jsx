import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../assets/img/logo.png";

function Header() {
  return (
    <Container>
      <Row>
        <Col>
          <img className="logo" src={logo} alt="The Chew View logo" />
        </Col>
        <Col>
          <a href="https://github.com/katiechurchwell/Chew-View">
            <i class="devicon-github-original" />
            Check us out on GitHub!
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
