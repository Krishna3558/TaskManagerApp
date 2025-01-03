const jwt = require('jsonwebtoken');

const authenticate = (req , res , next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: "unauthorized token"});

    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.UserId = decode.UserId;
        next();
    }
    catch(err){
        res.status(401).json({message: "invalid token"});
    }
}

module.exports = authenticate;