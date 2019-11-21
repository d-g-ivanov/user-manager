const Joi = require('@hapi/joi');

module.exports = {
    post: Joi.object().keys({
        name: Joi.string().min(3).required().error( ()=> 'Name is required and must be minimum 3 characters.' ),
        company: Joi.string().allow(''),
        about: Joi.string().required().error( ()=> 'Description is required and should be a string.' ),
        username: Joi.string().alphanum().min(3).max(30).required().error( ()=> 'Username is required and must be an alphanumeric string between 3 and 30 characters.' ),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error( ()=> 'Password is required and must be an alphanumeric string between 3 and 30 characters.' ),
        picture: Joi.string().allow('')
    }),

    put: Joi.object().keys({
        name: Joi.string().min(3).error( ()=> 'Name is required and must be minimum 3 characters.' ),
        company: Joi.string().allow(''),
        about: Joi.string().error( ()=> 'Description should be a string.' ),
        username: Joi.string().alphanum().min(3).max(30).error( ()=> 'Username must be an alphanumeric string between 3 and 30 characters.' ),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).error( ()=> 'Password must be an alphanumeric string between 3 and 30 characters.' ),
        picture: Joi.string().allow('')
    })
}