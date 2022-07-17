const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const accessToken = req.cookies && req.cookies.authorization;

    if(!accessToken) return res.sendStatus(403);

    jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY, (err, decoded) => {
        if(err) return res.sendStatus(403);

        req.user_id = decoded.user_id;
        return next();
    });   
}