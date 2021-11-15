import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Me} from 'src/classes/Me';
import {LinkComponent} from 'src/components/LinkComponent';
import type {DefaultProps} from 'src/utils/DefaultProps';
import {
  homePath,
  postsPath,
  postsTitle,
  votesPath,
  votesTitle,
} from 'src/utils/pageHelpers';

const NavLink = ({children, href}: DefaultProps<{href: string}>) => {
  const router = useRouter();

  return (
    <LinkComponent href={href}>
      <Nav.Link active={router.pathname === href}>{children}</Nav.Link>
    </LinkComponent>
  );
};

export const HeaderComponent = () => {
  const me = Me.useMe();
  const authorized = useListen(me, ({authorized}) => authorized);
  const router = useRouter();
  const signOutHandler = () => {
    me.signOut();
    void router.push(homePath);
  };
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setExpanded(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Navbar
      bg="light"
      expand="lg"
      onToggle={toggle}
      expanded={expanded}
      collapseOnSelect
    >
      <Container fluid>
        <LinkComponent href={homePath}>
          <Navbar.Brand>ohutils.com</Navbar.Brand>
        </LinkComponent>

        <Navbar.Toggle aria-controls="navbar-links" />
        <Navbar.Collapse id="navbar-links">
          <Nav className="me-auto">
            <NavLink href={postsPath}>{postsTitle}</NavLink>
            <NavLink href={votesPath}>{votesTitle}</NavLink>
          </Nav>
          <Nav className="ms-auto">
            {authorized && (
              <Nav.Link onClick={signOutHandler}>ログアウト</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
