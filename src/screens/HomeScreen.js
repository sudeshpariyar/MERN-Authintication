import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

const HomeScreen = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Auth Home</Card.Title>
        <Card.Text>This is the main page for the Authintication.</Card.Text>
        <LinkContainer to={"/login"}>
          <Button variant="outline-info">Sign In</Button>
        </LinkContainer>
        <LinkContainer to={"/register"}>
          <Button className="mx-2" variant="outline-dark">
            Sign Up
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default HomeScreen;
