import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useLogout } from "../../hooks";
import { useSelector } from "react-redux";

function Header() {
    const { mutate } = useLogout();
    const {profileData} = useSelector(state => state.profile)
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container className="container">
                <Link to="/" className="brandlogo">
                    <img className="logo" src="https://www.intoglo.com/_next/image?url=%2F1075x790.gif&w=320&q=75" alt="logo" />
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <GiHamburgerMenu style={{ color: "#fff" }} />
                </Navbar.Toggle>
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="justify-content-end">
                    <Nav>
                        <Link className="linktag" to="/">
                            Dashboard
                        </Link>
                        <Nav.Item>
                            <button className="header-btn"
                                onClick={() => mutate(profileData.user.userId)}
                            >Logout</button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
