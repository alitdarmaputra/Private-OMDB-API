const User = require("../models/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token.js");

module.exports = async (req, res) => {
    const { name, password } = req.body;
    if(!name || !password) 
        return res.sendStatus(422);
    
    try {
        const user = await User.findOne({ where: { name: name }});
        
        if(!user) res.status(404).json({ Response: "False", message: "User not found"});

        bcrypt.compare(password, user.dataValues.password, async (err, isSame) => {
            if(err) console.log(err);

            if(isSame) {
                const accessToken = jwt.sign({ user_id: user.user_id }, process.env.SECRET_ACCESS_KEY, { expiresIn: "10m" });

                const refreshToken = jwt.sign({ user_id: user.user_id }, process.env.SECRET_REFRESH_KEY, { expiresIn: "3h" });
      
                // Save refresh token
                try {
                    const token = await Token.create({ token: refreshToken });
                    // Sign token to user cookie
                    res.cookie("authorization", accessToken, { httpOnly: true });
                    res.cookie("refresh", refreshToken, { httpOnly: true });
    
                    return res.json({ authorization: accessToken, refresh: refreshToken });
                } catch(err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
            } else {
                return res.status(401).json({ Response: "False", message: "Invalid username and password"});
            }
        })
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }

}