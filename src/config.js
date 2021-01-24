// Configuration variables
const port      = process.env.PORT        || '3001';
const mongoURI  = process.env.MONGODB_URI || 'mongodb://localhost/doctorfastdb';


module.exports = {
    port,
    mongoURI,
};