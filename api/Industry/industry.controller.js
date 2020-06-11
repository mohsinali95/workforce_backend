const { industry } = require('../../models/index');

module.exports = {

    create: async (req, res) => {
        let {
            name
        } = req.body

        try {
            let industryCheck = await industry.findAll({
                where: {
                    email
                }
            })
            if (industryCheck.length > 0) {
                return res.send({
                    code: 200,
                    message: 'Industry already exists',
                    data: []
                })
            }
            let createIndustry = await industry.create({
                name
            })

            res.send({
                code: 200,
                message: 'Industry Created',
                data: createIndustry
            })

        } catch (error) {
            res.send({
                code: 500,
                message: 'Api failed',
                data: error
            })
        }
    },

    get: async (req, res) => {
        // let { adminId } = req.params

        try {

            let industryResult = await industry.findAll({
                attributes: ["id","name"]
                // where: {
                //     adminId
                // }
            })
            return res.json({
                code: 200,
                message: 'Industries.',
                data: industryResult,
            })
        } catch (error) {
            return res.json({
                code: 500,
                message: 'API failed.',
                data: [],
            })
        }
    }

}