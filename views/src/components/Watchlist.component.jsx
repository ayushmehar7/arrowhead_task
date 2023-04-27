import { useEffect, useState, useCallback } from "react"
import { Container, Col, Row, ListGroup, Form, Button, Modal } from "react-bootstrap"
import axios from "axios"
import Cookies from "js-cookie"
import movieCard from "../movie-card.png"

const IMAGE_URL = "http://image.tmdb.org/t/p/original//";

export const WatchList = () => {
    const getUsername = () => Cookies.get("username")
    const [movies, setMovies] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(-1);
    const [currentMovieId, setCurrentMovieId] = useState(null)
    const markMovieAsWatched = async (id)=> {
        try{
            const res = await axios.patch(`http://localhost:8080/api/v1/watchlist/?username=${getUsername()}&movieId=${id}`)
            alert(res.data.message)
            getMovies()
        }catch(err){
            alert(err.response.data.message)
        }
    }
    const ratingMenu = (watched, rating, id) => {
        if(!watched){
            return <Col><Button onClick={() => markMovieAsWatched(id)} variant="primary">Mark As Watched</Button></Col>
        }else if(!rating){
            return <Col><Button onClick={() => {
                setCurrentMovieId(id)
                setShowModal(true)
            }}  variant="primary">Add Rating</Button></Col>
        }else{
            return <>
                <Col>
                    You rated {rating}
                </Col>
                <Col>
                <Button onClick={() => {
                                setCurrentMovieId(id)
                                setShowModal(true)
                            }} variant="primary">
                                <i className="bi bi-pencil"></i>
                </Button>
                </Col>
            </>
        }
    }
    const submitRating = async()=>{
        if(rating === -1){
            alert("Add a rating first")
            return
        }
        try {   
            await axios.patch(`http://localhost:8080/api/v1/rating?username=${getUsername()}&movieId=${currentMovieId}`, {
                rating: rating
            })
            setRating(-1)
            setCurrentMovieId(null)
            setShowModal(false)
            getMovies()
        } catch(err){
            alert(err.response.data.message)
        }
    }
    const deleteMovieFromWatchList = async (movieId) => {
        try{
            await axios.delete(`http://localhost:8080/api/v1/watchlist?username=${getUsername()}&movieId=${movieId}`)
            getMovies()
        }catch(err){
            alert(err.response.data.message)
        }
    }
    const getMovies = useCallback(async() => {
        const res = await axios.get(`http://localhost:8080/api/v1/watchlist/?username=${getUsername()}`)
        setMovies(res.data.movies)
    },[])
    useEffect(() => {
        getMovies()
    }, [getMovies])
    return (
        <Container style={{padding: "100px"}}>
            <ListGroup>
            {movies.map(movie => 
                    (
                        <ListGroup.Item>
                            <Row className="align-items-center">
                            <Col >
                                <img alt="art" height="200px" width="200px" src={movie.posterUrl ? IMAGE_URL+movie.posterUrl : movieCard} />
                            </Col>
                            <Col >
                            {movie.title}
                            </Col>
                            <>
                            {ratingMenu(movie.watched, movie.rating, movie.id)}
                            </>
                            <Col>
                                <Button onClick={() => deleteMovieFromWatchList(movie.id)} variant="danger"><i className="bi bi-trash"></i></Button>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                    )
            )}
            </ListGroup>
            <Modal show={showModal}>
                <Modal.Body>
                    <Form.Control type="number" step="0.1" placeholder="Your Rating" min="1" max="5" onChange={(event) => setRating(event.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    setRating(-1)
                    setCurrentMovieId(null)
                    setShowModal(false)}}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitRating}>
                    Submit Rating
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
