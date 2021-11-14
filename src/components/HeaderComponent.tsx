import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'src/utils/Link';
import {
  homePath,
  postsPath,
  postsTitle,
  votesPath,
  votesTitle,
} from 'src/utils/pageHelpers';

export const HeaderComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link href={homePath}>
          <Navbar.Brand>ohutils.com</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbar-links" />
        <Navbar.Collapse id="navbar-links">
          <Nav className="me-auto">
            <Link href={postsPath}>
              <Nav.Link>{postsTitle}</Nav.Link>
            </Link>
            <Link href={votesPath}>
              <Nav.Link>{votesTitle}</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
