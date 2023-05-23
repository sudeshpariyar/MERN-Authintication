import { Container, Nav, Row, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { removeCredentials } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(removeCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <LinkContainer to={"/"}>
          <Navbar.Brand>Auth</Navbar.Brand>
        </LinkContainer>

        <Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to={"/login"}>
                    <Nav.Link href="/login">Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={"/register"}>
                    <Nav.Link href="/register">Sign Up</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
