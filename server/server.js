// requires
const express =require('express'); // pulls in express from node_modules
const app = express(); // the server
const bodyParser =require('body-parser'); // for reading JSON
const pg =require('pg'); // pulls in pg for connecting to db


// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// globals
port = process.env.PORT || 3000;

// db setup
let pool;
if(process.env.DATABASE_URL) {
    console.log('connecting to heroku db');
    pool = new pg.Pool({
    connectionString:process.env.DATABASE_URL
    })

} 

else {
    console.log('running locally');
    pool = new pg.Pool({
        database: "db name goes here"
    });
}//end pool set up

//GET tasklist from db
app.get('/tasks', (req, res)=>{
    const queryString = 'SELECT * FROM "task_list" ORDER BY "due_date" ASC;';
    pool.query(queryString).then(results =>{
        res.send(results.rows);
    }).catch( (err)=>{
        console.log (err); // if there was an error running query
        res.sendStatus(500);
    }) // end query

});

//POST new task to db
app.post('/tasks', (req,res)=>{
    console.log('in /tasks POST:', req.body);
    const queryString = `INSERT INTO "task_list" ("task_type", "task_desc", "priority_lvl", "due_date", "is_complete")
    VALUES ($1, $2, $3, $4, $5);`;
    
    pool.query(queryString, [req.body.task_type, req.body.task_desc, req.body.priority_lvl, req.body.due_date, req.body.is_complete]).then(results =>{
        res.sendStatus(201);
    }).catch(err =>{
        console.log(err);
        res.sendStatus(500);
    })
});


// PUT is_complete toggle status
app.put('/tasks/:id', (req, res)=>{
    let taskId = req.params.id;
    let queryString =``;
    console.log("params:", taskId, req.body);

    if (req.body.completeStatus === 'true'){
        queryString = `UPDATE "task_list" SET "is_complete" ='F' WHERE "id" = $1;`;
    }
    else if (req.body.completeStatus === 'false'){
        queryString = `UPDATE "task_list" SET "is_complete" ='T' WHERE "id" = $1;`;
    }
    else {
        console.log('failed to execute change');
    }
    pool.query(queryString, [taskId])
        .then(result =>{
            console.log('Result from PUT:', result);
            res.sendStatus(200);
        })
        .catch(err =>{
            console.log('Error updating PUT', err);
            res.sendStatus(500);
        });
});

// DELETE task from db and DOM
app.delete('/tasks/:id', (req, res)=>{
    let taskId = req.params.id;
    const queryString = `DELETE FROM "task_list" WHERE "id" = $1;`;
    console.log('DELETING task with id=', taskId);
    pool.query(queryString, [taskId])
        .then((response)=>{
            console.log('Deleted!');
            res.sendStatus(200);
        })
        .catch((err)=>{
            console.log('Error deleted record', err);
            res.sendStatus(500);
        })
});

// Start Up the Server
app.listen(port, function(){
    console.log('Im Listening on:', port);
});
