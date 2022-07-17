const User = require("../models/Users.js");

module.exports = async (req, res) => {
    const { name, password } = req.body;
    if(!name || !password)
        return res.sendStatus(403);
    
    try {
        const user = await User.create({ name, password });
        res.json(req.body);
    } catch(err) {
        console.log(err);
        res.sendStatus(403);
    }
}