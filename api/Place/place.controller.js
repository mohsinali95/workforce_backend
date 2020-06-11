const { place } = require('../../models/index');

module.exports = {

    create: async (req, res) => {
        let {
            name,
            address,
            postalCode,
            createdBy
        } = req.body

        try {
            let placeResult = await place.create({
                name,
                address,
                postalCode,
                createdBy
            })

            res.send({
                'message': 'Location Created',
                "code": 200
            })

        } catch (error) {
            res.send({
                'message': 'API failed.',
                "code": 500
            })
        }
    },

    get: async (req, res) => {
        let { adminId } = req.query

        try {

            let places = await place.findAll({
                attributes: ["id", "name"],
                where: {
                    createdBy: adminId
                }
            })

            // if (places.length > 0) {
            places.unshift({
                id: 0,
                name: "Select Location."
            })
            // }

            res.send({
                'message': 'Places result',
                'data': places,
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

    bulkCreate: async (req, res) => {
        let { data } = req.body

        try {
            let bulkResult = await place.bulkCreate(data)

            res.send({
                'message': 'creating bulk places.',
                "code": 200
            })

        } catch (error) {
            res.send({
                'message': 'API failed.',
                "code": 500
            })
        }

    }

}


