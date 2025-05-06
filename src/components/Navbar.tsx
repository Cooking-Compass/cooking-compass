/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { Jost } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Form, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

// import font
const jost = Jost({ subsets: ['latin'] });

// eslint-disable-next-line react/prop-types
const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  const isExplorePage = pathName === '/explore';
  const isSearchPage = pathName === '/search';
  const isMyRecipe = pathName === '/myrecipes';
  const isSubmit = pathName === '/addrecipe';
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const encoded = encodeURIComponent(searchQuery.trim());
      router.push(`/search?q=${encoded}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission behavior
      handleSearch();
    }
  };

  return (
    <Navbar className={`${jost.className} py-3`} id="menucolor" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/logo-white.png" alt="Logo" width={300} className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(!isExplorePage && !isSearchPage) && (
            <Navbar.Brand href="/explore" className="navbar-text py-3 px-5">
              Explore
            </Navbar.Brand>
          )}
          <Navbar.Brand href="/addrecipe" className="navbar-text py-3">
            Submit a Recipe!
          </Navbar.Brand>
          {isExplorePage && (
            <Form.Control
              type="text"
              placeholder="Search for Recipes"
              className="me-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update the query on input change
              onKeyDown={handleKeyDown} // Trigger search on Enter key
            />
          )}
          {isSearchPage && (
            <Form.Control
              type="text"
              placeholder="Search for Recipes"
              className="me-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update the query on input change
              onKeyDown={handleKeyDown} // Trigger search on Enter key
            />
          )}
          {isMyRecipe && (
            <Form.Control
              type="text"
              placeholder="Search for Recipes"
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update the query on input change
              onKeyDown={handleKeyDown} // Trigger search on Enter key
            />
          )}
          <Nav className="navbar-text me-auto justify-content-start">
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            ) : (
              ''
            )}
          </Nav>
          <Nav className="ms-auto">
          {((!isSearchPage) && (!isExplorePage) && (!isMyRecipe) && (!isSubmit)) && (
            <Navbar.Brand href="/myrecipes" className="navbar-text py-3 px-5">
              My Recipes
            </Navbar.Brand>
          )}
          {(isSearchPage) && (
            <Navbar.Brand href="/explore" className="navbar-text py-3 px-5">
              Back To Explore
            </Navbar.Brand>
          )}
          {((isExplorePage)) && (
            <Navbar.Brand href="/myrecipes" className="navbar-text py-3 px-5">
            My Recipes
            </Navbar.Brand>
          )}
          {((isSubmit)) && (
            <Navbar.Brand href="/myrecipes" className="navbar-text py-3 px-5">
            My Recipes
            </Navbar.Brand>
          )}
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
