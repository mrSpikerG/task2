import React from 'react'; // we need this to make JSX compile
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
type CardProps = {
    title: string,
    paragraph: string
}
// export const Navbar = ({ title, paragraph }: CardProps) => {
//     return <aside>
//          <h2>{title}</h2>
//          <p>
//              {paragraph}
//          </p>
//      </aside>
//  }



export const MyNavbar = () => {
    return <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">Notes</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">

                    <Link className='nav-link' to='./active'>
                        Active
                    </Link>
                    <Link className='nav-link' to='./archive'>
                        Archived
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

}
