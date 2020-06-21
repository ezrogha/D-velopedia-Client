import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap'

import NavigationBar from '../components/layout/NavigationBar';
import LoginModal from '../components/layout/LoginModal';
import RegisterModal from '../components/layout/RegisterModal';

import ProfileItem from '../components/layout/ProfileItem';
import { getProfiles } from '../store/actions/profileActions';

export default () => {
  // const [profiles, setProfiles] = useState([])
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfiles())
  }, [])

  const { profiles, loading } = useSelector(state => state.profile)

  let renderProfileItems;
  if (profiles === null || loading) {
    renderProfileItems = <img src='/images/spinner.gif' style={{ width: "200px", margin: "auto", display: "block" }} alt="Loading..." />
  } else {
    if (profiles.length > 0) {
      renderProfileItems = profiles.map(profile => {
        return <ProfileItem profile={profile} />
      })
    } else {
      //No Profiles available
      renderProfileItems = <h1></h1>
    }
  }
  return (
    <>
      <NavigationBar show={show} handleClose={handleClose} showRegister={showRegister} handleCloseRegister={handleCloseRegister} handleShowRegister={handleShowRegister} handleShow={handleShow} />

      <Container>
        <Row>
          <Col md="12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">Browse and connect with developers</p>
            {renderProfileItems}
          </Col>
        </Row>
      </Container>
      <footer className="bg-dark text-white py-4 mt-5 text-center">
        <span>Copyright &copy; {new Date().getFullYear()} D-velopedia</span>
      </footer>

      <LoginModal show={show} handleClose={handleClose} />
      <RegisterModal showRegister={showRegister} handleCloseRegister={handleCloseRegister} handleShowLogin={handleShow} />
      </>
  )
}
