import { Button, Form, Col, Container } from "react-bootstrap";

function ZipcodeForm() {
  return (
    <Container>
      <Form>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Enter zipcode</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ZipcodeForm;
