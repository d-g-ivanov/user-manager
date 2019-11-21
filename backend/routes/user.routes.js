const UserController = require('../controllers/user.controller');
const UserValidation = require('../schemas/user.validation');

module.exports = [
    {
        path: '/api/users',
        method: 'GET',
        options: {
            auth: 'session'
        },
        handler: UserController.find
    },
    {
        path: '/api/users',
        method: 'POST',
        options: {
            auth: 'session',
            validate: {
                payload: UserValidation.post,
                failAction: (req, hapi, error) => {
                    let errs = error.details.reduce( (final, err) => {
                        final[err.context.key] = err.message;
                        return final;
                    }, {} );
                    return hapi.response({success: false, data: errs}).code(200).takeover();
                },
                options: { abortEarly: false }
            },
        },
        handler: UserController.create
    },
    {
        path: '/api/users/{id}',
        method: 'GET',
        options: {
            auth: 'session'
        },
        handler: UserController.findOne
    },
    {
        path: '/api/users/{id}',
        method: 'PUT',
        options: {
            auth: 'session',
            validate: {
                payload: UserValidation.put,
                failAction: (req, hapi, error) => {
                    let errs = error.details.reduce( (final, err) => {
                        final[err.context.key] = err.message;
                        return final;
                    }, {} );
                    return hapi.response({success: false, data: errs}).code(200).takeover();
                },
                options: { abortEarly: false }
            },
        },
        handler: UserController.update
    },
    {
        path: '/api/users/{id}',
        method: 'DELETE',
        options: {
            auth: 'session'
        },
        handler: UserController.delete
    }
];