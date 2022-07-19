const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    jwt.verify(req.cookies.authorization, process.env.SECRET_ACCESS_KEY, (err, decoded) => {
        if(err) return res.sendStatus(403);

        req.user_id = decoded.user_id;
        return next();
    });   
}