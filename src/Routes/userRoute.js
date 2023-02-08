const router = require("express").Router();
const bcrypt = require('bcrypt');
const { body } = require('express-validator');
const UserModel = require("../models/userModel");
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
router.use(bodyParser.json())


var bodyParser = require('body-parser')
router.use(bodyParser.json())


//Login API
router.post("/login",body('email').isEmail(),body('password').notEmpty(), async (req, res) => {
    console.log("from login route")
    try{
        console.log(req.body)
        const { email, password } = req.body;
        const userData = await UserModel.findOne({ email });
        if (userData) {
            let result = await bcrypt.compare(password, userData.password);
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,//expires within this time
                    data: userData._id,
                },
                    process.env.JWT_SECRET
                );
                res.status(200).json({
                    status: "Success",
                    message: "User logged in Successfully",
                    token: token,
                });
            } else {
                res.status(400).json({
                    status: "Password does not matched",
                    message: "Wrong Password",
                });
            }
        }else{
            res.status(400).json({
                status:"Failed",
                message:"User is not registered. Pls signup before signin"
            })
        }
    }catch(e) {
        res.status(400).json({
            status: "Failed",
            message: e.message,
        });
    }
});

//register API
router.post('/register',body('email').isEmail(),body('password').isLength({ min: 6, max: 16 }), async (req, res) => {
    try {
        console.log(req.body)
        const { email, password, confirmPassword } = req.body;
        let userData = await UserModel.findOne({ email });
        if (userData) {
            return res.status(409).json({//409:the request could not be processed because of conflict in the request.
                status: "Existed Email",
                message: "User already exists with the given email. Pls proceed to signin"
            })
        }
        console.log(password,confirmPassword)
        if (password !== confirmPassword) {
            return res.status(400).send('Password and confirm password are not matching');
        }

        bcrypt.hash(password, 12, async function (err, hash) {// Store hash in your password DB. bcrypt helps to store password safely
            if (err) {
                return res.status(500).json({//500 Internal Server Error server.
                    status: "Failed",
                    message: err.message
                })
            }
            userData   = await UserModel.create({
                email: email,
                password: hash,
                name: email.split("@")[0]
            });
            res.json({
                status: "Success",
                message: "User succesfully created",
                userData 
            })
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            status: "Failed",
            message: err.message
        })
    }
});
router.get('/get', async (req, res) => { 
    try{
        const userData = await UserModel.find();
        res.json({
            status: "Success",
            message: "User succesfully created",
            userData
        })
    }
    catch(e){
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;