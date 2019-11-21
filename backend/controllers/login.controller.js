// const Product = require('../models/product.model');
const users = require('../mockdata/data');

module.exports = {

    get(req, hapi) {
        if(req.state.sid) return { isLogged: true };
        return { isLogged: false };
    },

    post(req, hapi) {
        const { username, password } = req.payload;
        const account = users.filter( user => user.username === username )[0];

        if ( !account || password !== account.password ) {
            return { isLogged: false };
        }

        req.cookieAuth.set({ id: account._id });

        return { isLogged: true };
    },

    logout(req, hapi) {
        req.cookieAuth.clear();
        return { isLogged: false };
    }
};