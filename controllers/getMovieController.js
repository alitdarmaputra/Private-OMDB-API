const axios = require('axios').default;

module.exports = async (req, res) => {
    const title = req.params.title;
    try {
        let url = `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_APIKEY}`;
        const response = await axios.get(url);

        if(response.data.Response == 'True') {    // Movie founded
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
    } catch(e) {
        console.log(e);
    }
}