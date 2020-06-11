const { user, userPlace, place } = require('../../models/index');
const bcrypt = require('bcryptjs')
const EmailController = require("../Email/email.controller")

const sequelize = require('sequelize').Op;

module.exports = {

    createMOD: async (req, res) => {
        let {
            email,
            adminId,
            fullName,
            roleId,
            phone,
            industryId,
            placeId
        } = req.body

        try {
            let password = "user123"
            let passHash = await bcrypt.hash(password, 10)
            let users = await user.create({
                email,
                password: passHash,
                adminId,
                name:fullName,
                phone,
                roleId,
                industryId,
                isLoginAllowed: 1
            })

            let userplace = await userPlace.create({
                userId: users.id,
                placeId,
                createdBy: adminId
            })
            let body = `<h1>Welcome</h1><a href="http://${EmailController.host}/api/auth/verifyUser?email=${email}">Click here to verify your account.</a><br>Your password is: ${password}`

            EmailController.sendEmail(email, "Email Verification", body)
                .then((response) => {
                    res.send({
                        code: 200,
                        message: 'User Created',
                    })
                }).catch((error) => {
                    res.send({
                        code: 500,
                        message: 'Api failed',
                    })
                })



        } catch (error) {
            res.send({
                'message': 'API failed.',
                'data': error,
                "code": 500
            })
        }
    },

    getMOD: async (req, res) => {
        let { adminId } = req.query

        try {

            let mods = await user.findAll({
                attributes: ["id", "email", "name", "phone"],
                include: [{
                    model: place,
                    attributes: ["name"],
                    through: { attributes: [] }

                }],
                where: {
                    adminId,
                    roleId: 3
                }
            })

            res.send({
                'message': 'MOD result',
                'data': mods,
                "code": 200
            })
        } catch (error) {
            res.send({
                'message': 'API failed.',
                'data': error,
                "code": 500
            })
        }
    },

    createBulkMOD: async (req, res) => {
        let { data } = req.body

        try {
            let password = "user123"
            let passHash = await bcrypt.hash(password, 10)

            data.map(async (val) => {
                let checkUser = await user.findAll({
                    where: {
                        email: val.email
                    }
                })

                if (checkUser.length == 0) {
                    let userCreate = await user.create({
                        email: val.email,
                        password: passHash,
                        adminId: val.adminId,
                        name: val.name,
                        roleId: val.roleId,
                        industryId: val.industryId
                    })

                    let userplace = await userPlace.create({
                        userId: userCreate.id,
                        placeId: val.placeId
                    })
                }
            })

            res.send({
                'message': 'creating Bulk users...',
                "code": 200
            })

        } catch (error) {
            res.send({
                'message': 'API failed.',
                "code": 500
            })
        }
    },

    updateProfile: async (req, res) => {
        let { userId } = req.query
        let {
            name,
            companyName,
            phone,
            postalCode,
            state,
            country,
            unit,
            street
        } = req.body
        try {
            let updateUser = await user.update({
                name,
                companyName,
                phone,
                postalCode,
                state,
                country,
                unit,
                street

            }, {
                where: {
                    id: userId
                }
            })

            res.send({
                'message': 'Profile updated.',
                "code": 200
            })
        } catch (error) {
            res.send({
                'message': 'API failed.',
                "code": 500
            })
        }

    },
    getAlluser: async (req, res) => {
        let { roleId } = req.params;
        try {
            let getAlluser = await user.findAll({

                where: {

                    roleId,

                },


            })
            res.send({
                code: 200,
                message: "users",
                data: getAlluser
            })
        } catch (error) {
            res.send({
                code: 500,
                message: "Api Failed",
                data: error
            })
        }
    },
    updateAllow: async (req, res) => {
        let { userId } = req.params
        let { status } = req.body
        try {

            let update = await user.update({

                isLoginAllowed: status

            },
                {
                    where: {
                        id: userId
                    }
                })
            res.send({
                code: 200,
                message: "User Allow",
                data: update
            })

        } catch (error) {
            res.send({
                code: 500,
                message: "api Failed",
                data: error
            })

        }
    },
  

}