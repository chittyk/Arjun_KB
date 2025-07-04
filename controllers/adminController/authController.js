const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const Otp = require("../../models/Otp");
const User = require("../../models/User");
const sendOtp = require("../../utils/sendMail");

// registeration

const Register = async (req, res) => {

  try {
    const { email } = req.body;
    if(!email) return res.status(400).json({error:"email not found"})
    const isUser = await User.findOne({ email });


    //if exsit return
    if (isUser) return res.status(400).json({ msg: "User Already Exist" });

    // Generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    
    //save otp in db
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    //send otp to userEmail
     console.log(email)
    await sendOtp({ email, otp });
   

    res.status(200).json({ msg: "OTP sent to email", email });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

//  verify user and create user
verifyOtpAndCreateUser = async (req, res) => {
  const { email, password, otp } = req.body;
  try {
    const isValid = await Otp.findOne({ email,otp });
    console.log(isValid)
    if (!isValid)
      return res.status(500).json({ error: "Invalid Otp or Time Expired" });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashPassword,
    });
    await newUser.save();

    //create the token
    const payload = {
      userId:newUser._id,
      email: newUser.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });

    //remove otp
    await Otp.deleteOne({ email });
    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(console.error(error));
    res.status(500).json({ error: "User not Created try again" });
  }
};

//login session
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.status(400).json({ error: "Invalid email or password" });

    //create the token
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });

    res.status(200).json({
      msg: "User logged in successfuly",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await user.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //save otp to db
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: Date() },
      { upsert: true, new: true }
    );

    //send Otp
    await sendOtp({ email, otp });
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot OTP error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;
  try {
    const isValidOtp = await Otp.findOne({ email, otp });
    if (!isValidOtp)
      return res.status(400).json({ error: "invalid otp or expired otp" });

    //hashpassoword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate({ email }, { password: hashPassword });

    await Otp.deleteOne({ email });
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ error: "Server error" });

  }
};

module.exports = {
  Register,
  verifyOtpAndCreateUser,
  login,
  forgetPassword,
  resetPassword
};
