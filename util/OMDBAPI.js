const axios = require('axios').default;

async function getMovieData (value, parameter = "s") {
    try {
        let url = `http://www.omdbapi.com/?${parameter}=${value}&apikey=${process.env.OMDB_APIKEY}`;
        const response = await axios.get(url);
        return response;
    } catch(err) {
        throw err;
    }
}

module.exports = { getMovieData }