import { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import { Navigate } from "react-router"
import Cookies from "js-cookie"
import axios from "axios"

export const LoginForm = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(Cookies.get("username") === undefined)
    const logIn = async () => {
        try{
            try{
                if (!userName || !password) {
                    alert("Enter username and password")
                    return
                }
                const res = await axios.post("http://localhost:8080/api/v1/users/login", {
                    username: userName,
                    password: password
                })
                const name = res.data.user.username;
                console.log(name)
                Cookies.set("username", name, {expires: 30})
                setRedirect(false)
            }catch(err){
                alert(err.response.data.message)
            }
        }catch(err){
            alert(err)
        }
    }
    if(!redirect){
        return <Navigate to =  "/" />
    }
    return (
        <Container style={{paddingTop: "25px"}}>
            <Row className="justify-content-md-center" >
                <Col>
                <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={(event) => setUserName(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" onClick={logIn}>
                            Login
                        </Button>
                        <Button variant="danger" style={{marginLeft: "15px"}} href="/signup">
                            Sign Up
                        </Button>
                    </Form>    
                </Col>
            </Row>
        </Container>
    )
}