const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

module.exports= async (req, res) => {
    const refreshToken = req.cookies && req.cookies.refresh;

    if(!refreshToken) return res.sendStatus(403);

    try {
        const token = await Token.findOne({ where: { token: refreshToken }});

        if(!token) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, (err, decoded) => {
            if(err) return res.sendStatus(500);

            const newAccessToken = jwt.sign({ user_id: decoded.user_id }, process.env.SECRET_ACCESS_KEY, { expiresIn: "10m"});
    
            res.cookie("authorization", newAccessToken, httpOnly=true);
            res.json({ accessToken: newAccessToken });
        });
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}