const axios = require("axios").default;
const omdb = require("../util/OMDBAPI.js"); 

module.exports = async (req, res) => {
    const title = req.params.title;
    try {
        const response = await omdb.getMovieData(req.params.title, "t");
        
        if(response.data.Response == "True") {    // Movie founded
            res.json({ 
                Title: response.data.Title,
                Poster: response.data.Poster 
            });
        } else {
            res.json({
                Response: "False", 
                Error: response.data.Error
            });
        }
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}