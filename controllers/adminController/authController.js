const Otp = require("../../models/Otp")
const User = require("../../models/User")




const Register = async(req,res)=>{
    try {
        const {email}=req.body
        const isUser = await User.findOne({email})

        //if exsit return
        if(isUser) return res.status(400).json({msg:"User Already Exist"})
        
        // Generate otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        //save otp in db
        await Otp.findOneAndUpdate(
            {email},
            {otp, createdAt:new Date()},
            {upsert:true,new:true}
        )

        //send otp to userEmail
        await sendOtp({email,otp})
        
        res.status(200).json({ msg: "OTP sent to email", email });

    } catch (error) {
        res.status(500).json({error:"Failed to send OTP"})
    }
}


//  verify user and create user
verifyOtpAndCreateUser=async(req,res)=>{
    const {email,password,otp}=req.body
    try {
        const isValid = await Otp.findOne({email,otp})
        if(!isValid) return res.status(500).json({error:'Invalid Otp or Time Expired'})

        //hash password 
        const salt = bcrypt.genSalt(10)
        const hashPassword = bcrypt.hash(password,salt)

        const user = new User({
            email,
            password: hashPassword
        })
        await user.save()
        
        //remove otp
        await Otp.deleteOne({email})
        res.status(201).json({ message: "Account created successfully" });

    } catch (error) {
        console.log(console.error(error))
        res.status(500).json({error:"User not Created try again"})
        
    }
}




module.exports = {
    Register,
}