import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
export default function AdminLayout({ children }) {
  return (
    <div>
      <Navbar bg='light' variant='light' className='dashbord-nav'>
        <Navbar.Brand href='#home'>Banner</Navbar.Brand>
        <Nav className='ml-auto'>
          <Nav.Link href='#home'>
            {' '}
            <i className='fas fa-bell'></i>
          </Nav.Link>
          <Nav.Link href='#features'>
            <i className='fas fa-user-circle'></i>
          </Nav.Link>
        </Nav>
      </Navbar>

      {children}
      {/* <div>Admin Footer</div> */}
    </div>
  );
}
