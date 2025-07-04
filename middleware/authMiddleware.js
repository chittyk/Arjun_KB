const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async(req,res,next)=>{
    const xtoken = req.headers.xtoken

    if(!xtoken || !xtoken.startsWith("Bearer ")) return res.status(403).json({error:'Access denied: No token provide'})
    console.log("xtoken :",xtoken)
    const token = xtoken.split(" ")[1]
    console.log("token :",token)

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        const user = await User.findOne({_id:decoded.payload.userId})

        if(!user) return res.status(404).json({error:"user not found"})
        
        req.user= user
        next()
        
    } catch (error) {
        console.error("Admin token verification error:", error);
        return res.status(403).json({ msg: "Invalid or expired token" });
    }

}

module.exports = auth