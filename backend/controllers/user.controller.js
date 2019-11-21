// mock data
let data = require('../mockdata/data');

//helper to simulate ID creation
const makeid = length => {
    let id = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));

    return id;
};

const isUsernameUnique = (username) => {
    let unique = data.filter( user => user.username === username );

    return (unique.length === 0);
}

module.exports = {

    create(req, hapi) {
        let user = { 
            name: req.payload.name,
            company: req.payload.company || 'Not specified',
            about: req.payload.about,
            username: req.payload.username,
            password: req.payload.password,
            picture: req.payload.picture || 'img/unknown.jpg',
            _id: makeid(24)
        }

        let isUnique = isUsernameUnique(user.username);

        if (!isUnique) return { success: false, data: { username: 'User already exists.' } }

        data.unshift(user);

        return { success: true, data: user };
    },

    find(req, hapi) {
        return { success: true, data: data };
    },

    findOne(req, hapi) {
        let user = data.filter( user => user._id === req.params.id );
        return user[0];
    },

    update(req, hapi) {
        let idx = data.findIndex( user => user._id === req.params.id );
        
        data[idx] = Object.assign(data[idx], req.payload);
        
        return { success: true, data: data[idx] };
    },

    delete(req, hapi) {
        let user = data.filter( user => user._id === req.params.id );
        data = data.filter( user => user._id !== req.params.id );
        return { success: true, data: user };
    }
};