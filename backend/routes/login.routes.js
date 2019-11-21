const LoginController = require('../controllers/login.controller');

module.exports = [
    {
        path: '/api/login',
        method: 'GET',
        handler: LoginController.get
    },
    {
        path: '/api/login',
        method: 'POST',
        handler: LoginController.post
    },
    {
        path: '/api/logout',
        method: 'GET',
        handler: LoginController.logout
    }
];