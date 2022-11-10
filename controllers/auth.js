const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require("../config/keys");

exports.signupController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ errorMessage: "Email Already Exists" });
        }

        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        bcrypt.hash(password, 10).then(function (hash) {
            // Store hash in your password DB.
            newUser.password = hash
            newUser.save();
            res.json({ successMessage: "Registration Successfully, please login" });
        });
    } catch (err) {
        res.status(400).json({ errorMessage: "Sign up server error" });
    }
}

exports.signinController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ errorMessage: " User Not Found..." });
        }

        const hashPassword = user.password;

        bcrypt.compare(password, hashPassword, (err, result) => {
            if (err) {
                res.status(400).json({ errorMessage: "Something Went Wrong" });
            }
            //if email and password match
            else if (result) {
                const payload = {
                    user: {
                        _id: user._id,
                    }
                }

                jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
                    if (err) {

                        console.log("jwt error: ", err);
                        res.status(400).json({ errorMessage: "jwt error" })
                    }

                    const { _id, username, email, role } = user;
                    res.json({
                        token,
                        user: { _id, username, email, role },
                    });

                });
            }
            else {
                res.status(400).json({ errorMessage: "Invalid credentials" });
            }
        });

    } catch (err) {
        res.status(500).json({ errorMessage: "Sign up server error" });
    }
}
