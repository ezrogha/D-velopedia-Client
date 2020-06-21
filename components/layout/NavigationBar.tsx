import { Navbar, Nav, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';

import { logoutUser } from '../../store/actions/authAction'

const emptyFunc = () => { }

export default function NavigationBar({ handleShowRegister = emptyFunc, handleShow = emptyFunc, position = "static" }) {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.user)

  const logout = () => {
    dispatch(logoutUser())
    Router.push('/')
  }

  const authLinks = (
    <Nav className="ml-auto">
      <Nav.Link onClick={logout}>
        <Image src={user.avatar} roundedCircle style={{ width: '25px', marginRight: '5px' }} />
        Logout
      </Nav.Link>
    </Nav>
  )

  const guessLinks = (
    <Nav className="ml-auto">
      <Nav.Link onClick={handleShowRegister}>Sign Up</Nav.Link>
      <Nav.Link onClick={handleShow}>Login </Nav.Link>
    </Nav>
  )

  return (
    <>
      <Navbar bg="dark" expand="lg" className={`navbar-dark ${position} px-5 mb-4`}>
        <Link href="/dashboard"><Navbar.Brand style={{ cursor: "pointer" }}>Dvelopedia</Navbar.Brand></Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
          <Link href="/profiles"><Nav.Link as="span" style={{ cursor: "pointer" }}>Developers</Nav.Link></Link>
          </Nav>
          {isAuthenticated ? authLinks : guessLinks}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
