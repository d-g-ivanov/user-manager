// const Product = require('../models/product.model');
module.exports = {
    get(req, hapi) {
        return hapi.file('index.html');
    }
};