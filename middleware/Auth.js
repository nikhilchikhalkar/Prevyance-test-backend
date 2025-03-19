const jwt = require('jsonwebtoken')
const Auth = async(req, res, next )=>{
    try {
        const token = req.headers.authorization
        console.log("token",token);
        if (token) {
            console.log("nikh");
            const decoded = await jwt.verify(token, 'Nikhil')
            console.log(decoded.userid); 
            req.body.userid = decoded.userid
            next()

        } else { 
            res.status(401).json({
                msg: "Invalid token try Again..."
            })
        }
        
    } catch (error) {
        console.log('unauthorise error',error);
    }
}
module.exports = Auth