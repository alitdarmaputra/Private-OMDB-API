const Favorite_movie = require("../models/Favorite_movie.js");
const axios = require("axios").default;

module.exports = async (req, res) => {
    try {
        const favorite_movies = await Favorite_movie.findAll({ where: { user_id: req.user_id }});
        
        const movies_request = [];
        favorite_movies.forEach(movie => {
            movies_request.push(axios.get(`http://www.omdbapi.com/?t=${movie.dataValues.title}&apikey=${process.env.OMDB_APIKEY}`));
        });

        axios.all(movies_request)
        .then(axios.spread((...responses) => {
            const movies_poster = [];

            for(let i = 0; i<responses.length; i++) {
                if(responses[i].data.Response == "True") {
                    movies_poster.push({
                        Title: responses[i].data.Title,
                        Poster: responses[i].data.Poster 
                    });
                }
            }
            res.json({ movies_poster });
        })).catch(errors => {
            console.log(errors);
            res.sendStatus(500);
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}