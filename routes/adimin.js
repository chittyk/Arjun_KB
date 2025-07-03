const express =  require('express');
const { Register, verifyOtpAndCreateUser, login, forgetPassword, resetPassword } = require('../controllers/adminController/authController');
const router = express.Router()


// auth controller
router.post('/register', Register );             // Send OTP
router.post('/verify', verifyOtpAndCreateUser ); // Complete registration with OTP
router.post('/login', login);
router.post('/forgetPassword',forgetPassword)
router.post('/resetPassword',resetPassword)



module.exports = router