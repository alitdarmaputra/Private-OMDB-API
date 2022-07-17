const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

module.exports= async (req, res) => {
    const refreshToken = req.cookies && req.cookies.refresh;

    if(!refreshToken) res.sendStatus(403);

    try {
        const token = await Token.findOne({ where: { token: refreshToken }});

        if(!token) throw new Error("Document not found");

        jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, (err, decoded) => {
            if(err) return res.sendStatus(403);

            const newAccessToken = jwt.sign({ user_id: decoded.user_id }, process.env.SECRET_ACCESS_KEY, { expiresIn: "10m"});
    
            res.cookie("authorization", newAccessToken, httpOnly=true);
            res.json({ accessToken: newAccessToken });
        });
    } catch(err) {
        console.log(err);
        res.sendStatus(403);
    }
}