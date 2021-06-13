import React from 'react';
import { Nav, Navbar, Row, Col } from 'react-bootstrap';
export default function AdminLayout({ children }) {
  return (
    <div>
      <Navbar className='frontend-navbar'>
        <Navbar.Brand href='#home' className='nav-text'>
          <strong>Nimbus</strong>
        </Navbar.Brand>
        <Nav className='ml-auto'>
          <Nav.Link href='#features' className='text-white'>
            Home
          </Nav.Link>
          <Nav.Link href='#features' className='text-white'>
            Product
          </Nav.Link>
          <Nav.Link href='#features' className='text-white'>
            Offers
          </Nav.Link>
          <Nav.Link href='#features' className='text-white'>
            About us
          </Nav.Link>
          <Nav.Link href='#features' className='text-white'>
            Contact us
          </Nav.Link>
          <Nav.Link href='#home' className='nav-text'>
            {' '}
            <i className='fas fa-search'></i>
          </Nav.Link>
          <Nav.Link href='#home' className='nav-text'>
            {' '}
            <i className='fas fa-shopping-cart'></i>
          </Nav.Link>
          <Nav.Link href='#features' className='nav-text'>
            <i className='far fa-user'></i>
          </Nav.Link>
        </Nav>
      </Navbar>

      {children}
      <div className='footer'>
        <Row>
          <Col lg='3'>
            <h1>Nimbus</h1>
          </Col>
          <Col lg='3'>
            <p>ABOUT US</p>
            <p>OUR HISTORY</p>
            <p>CONTACT US</p>
          </Col>
          <Col lg='3'>
            <p>POLICIES</p>
            <p>CANCILATION POLICIES</p>
            <p>PRIVACY POLICIES</p>
            <p>TERMS AND CONDITIONS</p>
          </Col>
          <Col lg='3'>
            <p>CONTACT US</p>
            <p>+91 9900 0000 00</p>
            <i className='icons fab fa-facebook-square'></i>
            <i className='icons fab fa-twitter'></i>
            <i className='icons fab fa-instagram'></i>
            <i className='icons fab fa-pinterest'></i>
          </Col>
        </Row>
      </div>
    </div>
  );
}
