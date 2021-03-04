var http = require('http');
var express = require('express');
var app = express();
const sql = require('mssql')
var path = require('path');

//Main-Path
var dir = __dirname;
dir = dir.substring(0, dir.length - 7);

//GET-Function declaration
app.get('/', function (req, res) {
   res.sendFile(path.join(dir + 'index.html'));
});
app.get('/getLessons', getLessons);

//statische Dateien bereitstellen
app.use('/static', express.static(dir +'includes'));



async function getLessons(req, res) {
    
        //read DozentenID from querystring
        if (req.query.ID) {
            var ID = req.query.ID;
        }
        else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end();
        }

        //DB-query
        var data = Promise.resolve(SQLgetLessons(ID));
        res.send(await data);
   
}

function SQLgetLessons(ID) {
    return new Promise(function (resolve, reject) {


        var id = ID;
        var sql = require("mssql");

        // config for your database
        var config = {
            user: 'wwwstdplan',
            password: 'Key123',
            server: 'localhost',
            database: 'stundenplan'
        };

        // connect to your database
        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records
            request.input('DozentID', sql.VarChar, id);
            request.query('select top (10) * from dozent_anwesend where DozentID = @DozentID', function (err, recordset) {

                if (err) {
                    console.log(err);
                    reject(err);
                }

                // send records as a response
                resolve(recordset.recordset);

            });
        });


    });

}


var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server is running at http://%s:%s   :)", host, port);
})


