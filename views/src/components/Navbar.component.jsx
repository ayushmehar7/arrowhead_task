import { Fragment, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import logo from "../movie_logo.png"
import Cookies from 'js-cookie';

export const MovieNavbar = () => {
    const username = Cookies.get("username")
    const logOut = ()=> {
        Cookies.remove("username")
        alert("Logging out!")
        setRefresh(true)
    }
    const [refresh, setRefresh] = useState(username === undefined)
    return (
        <Fragment>
            <Navbar  bg="dark" variant="dark" expand="lg" style={{height: "50px"}}>
            <Container fluid>
                <Navbar.Brand>
                <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                The Movie Database
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {refresh ? <Button href='/login' variant="primary" >Login</Button> :  
                    (<><Button style={{marginRight: "5px"}} value="primary" href="/watchlist">Watchlist</Button><Button style={{marginLeft: "5px"}} variant="primary" onClick={logOut} >Logout</Button></>)
                    }
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </Fragment>
    )
}