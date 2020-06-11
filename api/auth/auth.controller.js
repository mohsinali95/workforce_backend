const { user } = require('../../models/index');
const EmailController = require("../Email/email.controller")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path');

module.exports = {

    register: async (req, res) => {
        let {
            email,
            password,
        } = req.body

        try {
            let userCheck = await user.findAll({
                where: {
                    email
                }
            })
            if (userCheck.length > 0) {
                return res.send({
                    code: 500,
                    message: 'User already exists',
                    data: []
                })
            }
            let passHash = await bcrypt.hash(password, 10)
            let createUser = await user.create({
                email,
                password: passHash,
                roleId: 2
            })
            let body = `<h1>Welcome</h1><a href="http://${EmailController.host}/api/auth/verifyUser?email=${email}">Click here to verify your account.</a>`
            EmailController.sendEmail(email, "Email verification", body)
                .then((response) => {
                    res.send({
                        code: 200,
                        message: 'User Created',
                        data: response
                    })
                }).catch((error) => {
                    res.send({
                        code: 500,
                        message: 'Api failed',
                        data: error
                    })
                })

        } catch (error) {
            res.send({
                code: 500,
                message: 'Api failed',
            })
        }
    },
    verifyUser: async (req, res) => {
        let { email } = req.query

        try {

            let checkVerify = await user.findAll({
                where: {
                    email
                }
            })

            if (checkVerify.length == 0) {
                // return res.send({
                //     code: 200,
                //     message: 'User Not Present.',
                //     data: email
                // })
                res.sendFile('/pages/userNotPresent.html', { root:'.' });

            } else if (checkVerify[0].isEmailVerfied == 0) {
                let userUpdate = await user.update({
                    isEmailVerfied: 1
                }, {
                    where: {
                        email
                    }
                })
                res.sendFile('/pages/userVerify.html', { root:'.' });
            // res.send({
            //     code: 200,
            //     message: 'User Verified.',
            //     data: userUpdate
            // })
            } else if (checkVerify[0].isEmailVerfied == 1) {
                // res.send({
                //     code: 200,
                //     message: 'User already Verified.',
                //     data: []
                // })
                res.sendFile('/pages/userAlreadyExist.html', { root:'.' });

            } else {
                // res.send({
                //     code: 500,
                //     message: 'Something Went wrong.',
                //     data: []
                // })
                res.sendFile('/pages/someThingWentWrong.html', { root:'.' });

            }

        } catch (error) {
            res.send({
                code: 500,
                message: 'Api failed',
                data: error
            })
        }
    },

    login: async (req, res) => {
        let { email, password } = req.body
        try {
            let userResult = await user.findOne({
                where: {
                    email: email
                }
            })
            if (!userResult) return res.json({ code: 500, token: "", message: 'No user with this Email found.' });

            const isPassword = await bcrypt.compare(password, userResult.password);
            if (!isPassword) return res.json({ code: 500, token: "", message: 'Invalid email or password.' });

            const token = jwt.sign({ userResult }, 'jwtPrivateKey');

            return res.json({
                code: 200,
                message: 'Login successful',
                token: token,
            })

        } catch (error) {
            return res.json({ code: 500, token: "", message: 'Api Failed' });
        }
    },
    forgotPassword  : async (req,res)=>{
        let {email} = req.body

        try {
            let password = "user123"
            let passHash = await bcrypt.hash(password, 10)

            let update = await user.update({
             password : passHash,
             isLoginAllowed : 0
            },
            {
                where : {
                    email
                }
            })
            let body = `<h1>Welcome</h1>Your New Password is ${password}`

            EmailController.sendEmail(email, "Reset Password", body)

                .then((response) => {
                    res.send({
                        code: 200,
                        message: 'Email sent',
                    })
                }).catch((error) => {
                    res.send({
                        code: 500,
                        message: 'Api failed',
                        
                    })
                    console.log(error)
                })


        } catch (error) {
            res.send({
                code: 500,
                message: 'Api failed',
            })
            
        }
    }


}