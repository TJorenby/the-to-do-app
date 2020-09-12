// requires
const express =require('express'); // pulls in express from node_modules
const app = express(); // the server
const bodyParser =require('body-parser'); // for reading JSON
const pg =require('pg'); // pulls in pg for connecting to db

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// globals
port = 5000;

// db setup
const Pool = pg.Pool;
// configure connection to db
const pool = new Pool({
    database:"music_library", // db name (NOT table name)
    host:"localhost", // default when running locally, will change when deploying
    port: 5432, // default port for local, also will change when deployed
    max: 12, // max # of connections
    idleTimeoutMillis: 20000 // connection timeout in MS
}); //end pool set up



// Start Up the Server
app.listen(port, function(){
    console.log('Im Listening on:', port);
});
