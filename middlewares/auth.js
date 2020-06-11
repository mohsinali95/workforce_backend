const { user } = require("../models/index")

module.exports = {
    isUserEmailVerified: async (req, res, next) => {
        let { email } = req.body

        let userEmailVerification = await user.findAll({
            where: {
                email
            }
        })

        if (userEmailVerification[0].isEmailVerfied == 0) {
            return res.json({
                code: 403,
                token: "",
                message: 'Please verify user email first.'
            });
        } else if (userEmailVerification[0].isLoginAllowed == 0) {
            return res.json({
                code: 403,
                token: "",
                message: 'login Not Allowed.'
            });
        } else {
            next();
        }

    },

    isUserExists: async (req, res, next) => {
        let { email } = req.body

        let isUser = await user.findAll({
            where: {
                email
            }
        })

        if (isUser.length > 0) {
            return res.json({
                code: 500,
                message: 'User with this email Already Exists.'
            });
        } else {
            next();
        }
    },

    isNotUserExists: async (req, res, next) => {
        let { email } = req.body

        let isUser = await user.findAll({
            where: {
                email
            }
        })

        if (isUser.length == 0) {
            return res.json({
                code: 500,
                message: 'No user with this Email found.'
            });
        } else {
            next();
        }
    },
    
}  