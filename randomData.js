const axios = require("axios")
const registerUser = async (userName, password) => {
    try {
        await axios.post("http://localhost:8080/api/v1/users", {
            username: userName,
            password: password
        })
    }catch(err){
        console.log(err)
    }
}
const regsiterRandomUsers = ()=>{
    const baseName = "ayush.mehar."
    const basePassword = "password."
    for(let i=2;i<=10000;i++){
        const username = `${baseName}${i}`
        const password = `${basePassword}${i}`
        registerUser(username, password)
    }
}

const getMovieIDs = async ()=> {
    try{
        const response = await axios.get("http://localhost:8080/api/v1/movies")
        return response
    }catch(err){
        console.log(err)
    }
}

function randomInRange(min, max) {
    return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
  }

const postRandomRating = async(username, movieId)=>{
    try{
        const rating = randomInRange(1, 5)
        await axios.patch(`http://localhost:8080/api/v1/watchlist?username=${username}&movieId=${movieId}`, {
            rating: rating
        })
    }catch(err){
        console.log(err)
    }
}

const postRandomReviews = async ()=> {
        const rsp = getMovieIDs()
        .then(r => {
            const ids = r.data.movies.map(movie => movie.id)
            const shuffled = ids.sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 5);
            const baseName = "ayush.mehar."
            for(let i=1;i<=1000;i++){
                const username = `${baseName}${i}`
                selected.forEach(movieId => {
                    postRandomRating(username, movieId)
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

postRandomReviews()