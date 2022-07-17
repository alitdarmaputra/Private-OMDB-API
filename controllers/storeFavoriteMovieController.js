const Favorite_movie = require("../models/Favorite_movie.js");

module.exports = async (req, res) => {
    const { title } = req.body;
    console.log(req.user_id);
    if(!title) res.sendStatus(403);

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
        res.sendStatus(403);
    }
}