const testModel = require('../models/testModel');

const testPost = (req, res, mongoose) => {
    console.log(req)
    const { id, name } = req.body;
    const testmodel = new testModel({
        id,
        name
    });

    testmodel.save().then((ress) => {
        return res.status(200).json(ress);
    })
}

module.exports = {
    testPost
}