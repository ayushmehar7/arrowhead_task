const axios = require("axios")
const createMovie = (movie) => {
    const res = {
        id: movie.id,
        title: movie.title,
        rating: movie.popularity,
        releaseDate: movie.release_date,
        posterUrl: movie.poster_path
    }
    return res
}

const uploadMovie = (movie) => {
    axios.post("http://localhost:8080/api/v1/movies", movie)
        .then(() => {
            console.log("Uploaded successfully")
        }).catch(err => {
            console.log(err)
        })
}

const addMoviesToSQLDB = ()=> {
    const types = ["rent", "buy", "free", "ads", "flatrate"]
    for(let i=1;i<=621;i++){
        for(let j=1;j<5;j++){
            const URL = `https://api.themoviedb.org/3/discover/movie?api_key=d791f52f2f64225af59b9c6cdb6f8234&sort_by=release_date.desc&include_adult=true&include_video=false&page=${i}&year=2023&with_watch_monetization_types=${types[j]}`
            axios.get(URL)
                .then(data => {
                    const movies = data.data.results.map(movie => createMovie(movie))
                    movies.forEach((movie) => uploadMovie(movie))
                }).catch(err => {
                    console.log(err)
                })
        }
    }   
}

addMoviesToSQLDB()

