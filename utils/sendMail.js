const nodeMailer = require('nodemailer')


const transporter = nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },

})

const sendOtp = async(req,res)=>{
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject:"OTP for your Portfolio regiteration",
        html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Valid for 5 minutes</p>`,
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendOtp