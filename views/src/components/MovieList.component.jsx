import { useState, useEffect } from "react"
import Container from "react-bootstrap/esm/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import axios from "axios"
import Row from "react-bootstrap/esm/Row"
import movieCard from "../movie-card.png"
import Col from "react-bootstrap/esm/Col"
import Cookies from "js-cookie"
import { Form } from "react-bootstrap"

const IMAGE_URL = "http://image.tmdb.org/t/p/original//";

export const MovieList = ()=> {
    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [searchQuery, setSearchQuery] = useState(null)
    const username = Cookies.get("username")
    const [allMovies, setAllMovies] = useState([])
    const getMovies = async () => {
        try{
            const res = await axios.get("http://localhost:8080/api/v1/movies")
            setMovies(res.data.movies)
            setAllMovies(res.data.movies)
            setTotalPages(parseInt(Math.ceil(res.data.total_movies/10)))
            setCurrentPage(0)
        }catch(err){
            alert(err.response.data.message)
        }
    }
    const searchMovies = ()=> {
        if(!searchQuery || searchQuery.length === 0) {
            getMovies()
            return
        }
        console.log(allMovies.length)
        const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
        setMovies(filteredMovies)
        setTotalPages(parseInt(Math.ceil(filteredMovies.length/10)))
        setCurrentPage(0)
        setSearchQuery(null)
    }
    const getMoviePage = (movies) => {
        const start = currentPage*10;
        const end = Math.min(start + 10, movies.length);
        return movies.slice(start, end)
    }
    const incrementPage = () => {
        setCurrentPage((currentPage + 1)%totalPages)
    }
    const decrementPage = () => {
        setCurrentPage((currentPage -1 + totalPages)%totalPages)
    }
    const addToWatchList = async (movieId)=> {
        try{
            const res = await axios.post("http://localhost:8080/api/v1/watchlist", {
                username: username,
                movieId: movieId
            })
            alert(res.data.message)
        }catch(err){
            alert(err.response.data.message)
        }
    }
    useEffect(() => {
        getMovies()
    }, [])
    return (
        <Container>
        <Row style={{marginLeft: "350px", marginTop: "5px", marginBottom: "5px"}} className="align-items-center">
            <Col>
                <Form.Control type="text" placeholder="Search Movies by Title" onChange={(event) => setSearchQuery(event.target.value)} />
            </Col>
            <Col>
                <Button onClick={searchMovies}><i className="bi bi-search"></i></Button>
            </Col>
        </Row>
        <Row>
            {getMoviePage(movies).map((movie) => (
                <Card style={{ width: '15rem', margin: "5px 10px"}}>
                <Card.Img variant="top" style={{height: "300px"}} src={movie.posterUrl ? IMAGE_URL+movie.posterUrl : movieCard} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button variant="primary" onClick={() => addToWatchList(movie.id)}>Add to WatchList</Button>
                </Card.Body>
              </Card>
            ))}
        </Row>
        <Row>
        <Col className="d-flex justify-content-center">
        <Button style={{marginRight: "5px"}} onClick={decrementPage}> {"<-"} </Button>
        <Button style={{marginLeft: "5px"}} onClick={incrementPage}> {"->"} </Button>
        </Col>
        </Row>
        </Container>
    )
}