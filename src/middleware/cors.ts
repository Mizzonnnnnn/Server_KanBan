const cors = require('cors');

const whitelist = {
    origin: 'http://localhost:3000'
};

const corsMiddleware = cors(whitelist);

export default corsMiddleware;