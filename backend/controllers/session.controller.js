const data = require('../mockdata/data');

module.exports = {

    session() {
        return {
            cookie: {
                name: 'sid',
                password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
                isSecure: false, 
                ttl: 1 * 60 * 60 * 1000 
            },
            redirectTo: '/',
            validateFunc: async (request, session) => {
                const account = data.filter( user => (user._id === session.id) );

                if (!account) {
                    return { valid: false };
                }
    
                return { valid: true, credentials: account };
            }
        }
    }

};