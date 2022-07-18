const Favorite_movie = require("../models/Favorite_movie.js");

module.exports = async (req, res) => {
    const { title } = req.body;

    if(!title) return res.sendStatus(403);

    try {
        await Favorite_movie.create({ 
            title: title,
            user_id: req.user_id
        });
        res.json({ 
            title: title 
        });
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}