/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { Jost } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

// import font
const jost = Jost({ subsets: ['latin'] });

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  return (
    <Navbar className={`${jost.className} py-3`} id="menucolor" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/logo-white.png" alt="Logo" width={300} className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-text me-auto justify-content-start">
            {currentUser
              ? [
                  <Nav.Link id="add-stuff-nav" href="/add" key="add" active={pathName === '/add'}>
                    Add Stuff
                  </Nav.Link>,
                  <Nav.Link id="list-stuff-nav" href="/list" key="list" active={pathName === '/list'}>
                    List Stuff
                  </Nav.Link>,
                ]
              : ''}
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            ) : (
              ''
            )}
          </Nav>
          <Nav className="ms-auto">
            <Navbar.Brand href="/about" className="navbar-text py-3">
              About
            </Navbar.Brand>
            {session ? (
              <NavDropdown className="navbar-text d-flex" id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  {' '}
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown className="custom-login-dropdown navbar-text" id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  {' '}
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  {' '}
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
