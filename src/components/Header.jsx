/**
 * Author: Joseph Juarez
 * Date: 11/13/2025
 * File: Header.jsx
 * Description: This creates a common page header.
 */

import {NavLink} from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import logo from "/src/assets/img/icons8-games-folder-96.png";

//This component creates a React-Bootstrap navbar. https://react-bootstrap.github.io/components/navbar/
const Header = () => {
    const className = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="sm">
                <Container>

                    <NavLink to="/">
                        <Navbar.Brand><img src={logo} alt="Logo"/>VideogameSPA</Navbar.Brand>
                    </NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className={className}>Home</NavLink>

                            <div className="nav-separator">|</div>

                            <NavLink to="/publishers" className={className}>Publishers</NavLink>
                        </Nav>
                            </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;