const Token = require("../models/Token.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    const refreshToken = req.cookies && req.cookies.refresh;

    if(!refreshToken) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, async (err, decoded) => {
        if(err) return res.sendStatus(403);
        try {
            const tokenToDel = await Token.findOne({ where: { token: refreshToken }});
            tokenToDel.destroy();
            return res.json({ message: "Log Out Success" });
        } catch(err) {
            console.log(err);
            return res.sendStatus(403);
        }
    });
}