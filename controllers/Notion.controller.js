const dotenv = require("dotenv")
const {Client} = require("@notionhq/client")
const axios  = require("axios")

dotenv.config({
    path: "../.env"
})
const notion = new Client({auth: process.env.NOTION_API_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

exports.addToNotionDatabase = async (username, movieId, rating) => {
    try{
        const response = await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                'Username': {
                    type: 'title',
                    title: [
                    {
                        type: 'text',
                        text: {
                            content: username,
                        },
                    },
                    ],
                },
                'Movie ID' : {
                        type: 'rich_text',
                        rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: movieId,
                            },
                        }
                        ],
                },
                'Rating': {
                    type: 'number',
                    number: parseFloat(rating)
                },
            }    
        })
        console.log(response)
    }catch(err){
        console.log(err)
    }
}

function subtractHours(date, hours) {
    date.setHours(date.getHours() - hours);
    return date;
  }

const getObjectFromProps = (props) => {
    const movie = {}
    movie.rating = props["Rating"].number
    movie.username = props["Username"].title[0].plain_text
    movie.movieId = props["Movie ID"].rich_text[0].plain_text
    return movie
}

const addtoSQLDatabase = async (rating) => {
    try{
        await axios.patch(`http://localhost:8080/api/v1/watchlist?username=${rating.username}&movieId=${rating.movieId}`, {
        rating: rating.rating
    })
    }catch(err){
        console.log(err)
    }
}

exports.getDataFromNotionDatabase = async () => {
    try {
        const thresholdDate = new Date(subtractHours(new Date(Date.now()), 12));
        const ratingUpdates = await notion.databases.query({
            database_id: databaseId,
            filter : {
                date : {
                    after: thresholdDate.toISOString()
                },
                property : "Created time"
            }
        });
        const ratings = ratingUpdates.results.map(result => getObjectFromProps(result.properties))
        ratings.forEach(rating => addtoSQLDatabase(rating))
    } catch(err){
        console.log(err)
    }
}