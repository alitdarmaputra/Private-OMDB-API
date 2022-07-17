const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token.js");

module.exports = async (req, res) => {
    const { name, password } = req.body;
    if(!name || !password) 
        return res.sendStatus(403);
    
    try {
        const user = await User.findOne({ where: { name: name }}).then(result => {
            if(result) return result.dataValues;
            return result;
        });
        
        if(!user) throw new Error("User not found");

        bcrypt.compare(password, user.password, async (err, isSame) => {
            if(err) {
                console.log(err);
                return;
            }

            if(isSame) {
                let accessToken, refreshToken;

                jwt.sign({ user_id: user.user_id }, process.env.SECRET_ACCESS_KEY, { expiresIn: "10000" }, (err, token) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    accessToken = token;
                });

                jwt.sign({ user_id: user.user_id }, process.env.SECRET_REFRESH_KEY, { expiresIn: "3h" }, (err, token) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    refreshToken = token;
                });

                // Save refresh token
                try {
                    await Token.create({ token: refreshToken });
                    // Sign token to user cookie
                    res.cookie("authorization", accessToken, { httpOnly: true });
                    res.cookie("refresh", refreshToken, { httpOnly: true });
    
                    return res.json({ authorization: accessToken, refresh: refreshToken });
                } catch(err) {
                    console.log(err);
                }
            }
            return res.sendStatus(403);
        })

    } catch(err) {
        console.log(err);
        res.sendStatus(403);
    }

}