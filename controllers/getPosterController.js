const axios = require("axios").default;

module.exports = async (req, res) => {
    const title = req.params.title;
    try {
        const response = await axios.get(`http://www.omdbapi.com/?t=${value}&apikey=${process.env.OMDB_APIKEY}`);
               
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