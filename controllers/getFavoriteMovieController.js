const Favorite_movie = require("../models/Favorite_movie.js");
const omdb = require("../util/OMDBAPI.js");

module.exports = async (req, res) => {
    try {
        const favorite_movies = await Favorite_movie.findAll({ where: { user_id: req.user_id }});
        
        const movies_request = [];
        for(let i = 0; i<favorite_movies.length; i++) {
            const request = omdb.getMovieData(favorite_movies[i].dataValues.title, "t");
            movies_request.push(request);
        }
        
        let favorite_movies_poster = [];

        favorite_movies_poster = await Promise.all(movies_request)
        .then(movies => {
            return movies.map(movie => {
                return {
                    Title: movie.data.Title,
                    Poster: movie.data.Poster
                } 
            });
        });

        res.json({ favorite_movies_poster });
    } catch (err) {
        console.log(err);
        res.sendStatus(403);
    }
}