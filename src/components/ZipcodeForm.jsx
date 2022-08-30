import { Button, Form, Stack } from "react-bootstrap";

function ZipcodeForm() {
  return (
          <Stack direction="horizontal" gap={2} className="md-5 mx-auto" id="zipcode">
            <Form.Control type="text" placeholder="Enter zipcode" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Stack>
  );
}

export default ZipcodeForm;
