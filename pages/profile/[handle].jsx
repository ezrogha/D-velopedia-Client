import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import NavigationBar from '../../components/layout/NavigationBar';
import LoginModal from '../../components/layout/LoginModal';
import RegisterModal from '../../components/layout/RegisterModal';

import { getProfilebyHandle } from '../../store/actions/profileActions';


import NavFooter from '../../components/layout/NavFooter';
// import Spinner from '../../public/images/spinner.gif';
import { Button, Container } from 'react-bootstrap';
import ProfileHeader from '../../components/layout/profile/ProfileHeader';
import ProfileAbout from '../../components/layout/profile/ProfileAbout';
import ProfileCredentials from '../../components/layout/profile/ProfileCredentials';
import ProfileGithub from '../../components/layout/profile/ProfileGithub';

export default () => {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const router = useRouter()
  const { handle } = router.query
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfilebyHandle(handle))
  }, [handle])

  const { profile, loading } = useSelector(state => state.profile)

  let renderProfile;

  console.log(profile)
  if (profile === null || loading) {
    renderProfile = <img src='/images/spinner.gif' style={{ width: "200px", margin: "auto", display: "block" }} alt="Loading..." />
  } else {
    console.log(profile.user?.name)
    renderProfile = (
      <div>
        <Button variant="light" className="mb-3" onClick={() => Router.back()}>Back To Profiles</Button>
        <ProfileHeader profile={profile} />
        <ProfileAbout />
        <ProfileCredentials />
        <ProfileGithub />
      </div>
    )
  }

  return (
    <>
      <NavigationBar show={show} handleClose={handleClose} showRegister={showRegister} handleCloseRegister={handleCloseRegister} handleShowRegister={handleShowRegister} handleShow={handleShow} />
      <Container>
        {renderProfile}
      </Container>
      <footer className="bg-dark text-white py-4 mt-5 text-center">
        <span>Copyright &copy; {new Date().getFullYear()} D-velopedia</span>
      </footer>
      <LoginModal show={show} handleClose={handleClose} />
      <RegisterModal showRegister={showRegister} handleCloseRegister={handleCloseRegister} handleShowLogin={handleShow} />
    </>
  )
}
