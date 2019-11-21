const HomeControler = require('../controllers/home.controller');

module.exports = [
    {
        path: '/',
        method: 'GET',
        // options: {
        //     auth: "session"
        // },
        handler: HomeControler.get
    }
];