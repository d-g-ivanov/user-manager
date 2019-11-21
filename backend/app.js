
//imports
const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Cookie = require('@hapi/cookie');

const homeRoutes = require('./routes/home.routes');
const loginRoutes = require('./routes/login.routes');
const userRoutes = require('./routes/user.routes');

const sessionController = require('./controllers/session.controller');


//init
const init = async () => {
    //create server
    const server = new Hapi.Server({
        port: 8000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(Inert);
    await server.register(Cookie);

    //auth strategy
    server.auth.strategy('session', 'cookie', sessionController.session() );

    // mongoose goes here    

    //static files
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true
            }
        }
    });

    //not found
    server.route({
        path: '/{any*}',
        method: '*',
        handler(req, hapi) {
            return '404 Error! Page Not Found!';
        }
    });

    //routes
    server.route(homeRoutes);
    server.route(loginRoutes);
    server.route(userRoutes);


    //start server
    await server.start();
    console.log(`Running at ${server.info.uri}`);
}

init();