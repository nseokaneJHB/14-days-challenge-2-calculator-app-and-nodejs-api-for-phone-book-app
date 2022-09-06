const pgp = require('pg-promise')({
    // Initialization Options
});

// Preparing the connection details:
const cn = 'postgres://postgres:postgres@localhost:5432/phonebook_api';

// Creating a new database instance from the connection details:
const connect = pgp(cn);

// Exporting the database object for shared use:
module.exports = connect;