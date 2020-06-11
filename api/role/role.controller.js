const { role } = require('../../models/index');
const sequlize = require("sequelize")
const op = sequlize.Op

module.exports = {
    create: async (req, res) => {
        let { name } = req.body
        try {

            let checkRole = await role.findAll({
                where: {
                    name: {
                        [op.like]: `%${name}%`
                    }
                }
            })
            if (checkRole.length > 0) {
                return res.send({
                    code: 403,
                    message: "Role already created."
                })
            }
            let createRole = await role.create({
                name
            })
            res.send({
                code: 200,
                data: createRole,
                message: "Role Create"
            })

        } catch (error) {
            res.send({
                code: 500,
                data: error,
                message: "Api Failed"
            })
        }
    },
    getAll: async (req, res) => {

        try {
            let getAllRoles = await role.findAll({
                attributes: ["id", "name"],
                where: {
                    id:{
                        [op.notIn]: [1]
                      }
                }
            })
            res.send({
                code: 200,
                data: getAllRoles,
                message: "Role result"
            })

        } catch (error) {
            res.send({
                code: 500,
                data: error,
                message: "Api Failed"
            })
        }
    }

}