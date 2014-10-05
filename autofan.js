'use strict';
//require('newrelic');
//Get started with New Relic APM and New Relic Insights
//https://rpm.newrelic.com/accounts/681679/applications/setup?destination=web

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    watch = require('node-watch'),
    mongoose = require('mongoose');

var app = module.exports = express();
var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);

/**
 * Main application file
 */

// Default node environment to development

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
app.set('port', process.env.PORT || 3330);
// Application Config
var config = require('./lib/config/config');

// Connect to database
//var i = Date.now();
var db = mongoose.connect(config.mongo.uri, config.mongo.options);
/*var _ = require('underscore')
var collections = _.keys(db.connection.collections);
console.log(collections);*/
/*var j =Date.now();
console.log(j-i);*/
//db.connection.collections['brand'].drop();
/*db.dropCollection("brand", function(err, result) {
    assert.equal(null, err);

    // Verify that the collection is gone
    db.collectionNames("brand", function(err, names) {
        assert.equal(0, names.length);

        db.close();
    });
});*/
// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with sample data
//require('./lib/config/dummydata');

// Passport Configuration
require('./lib/config/passport')();




// Express settings
require('./lib/config/express')(app);


var routerCustom = express.Router();

routerCustom.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next();
});
require('./lib/routerCustom')(routerCustom);
app.use('/api/custom', routerCustom);


var routerJobType = express.Router();
require('./lib/routerJobType')(routerJobType);
app.use('/api/jobtype', routerJobType);
var routerJobName = express.Router();
require('./lib/routerJobName')(routerJobName);
app.use('/api/jobname', routerJobName);
var routerJobTicket = express.Router();
require('./lib/routerJobTicket')(routerJobTicket);
app.use('/api/jobticket', routerJobTicket);
var routerJobTicketArch = express.Router();
require('./lib/routerJobTicketArch')(routerJobTicketArch);
app.use('/api/jobticketarch', routerJobTicketArch);
var routerWorker = express.Router();
require('./lib/routerWorker')(routerWorker);
app.use('/api/worker', routerWorker);


// Routing
require('./lib/routes')(app);


app.use(function(error, req, res, next) {
    // log the error, treat it like a 500 internal server error
    // maybe also log the request so you have more debug information
    //log.error(err, req);

    // during development you may want to print the errors to your console
    //console.log(err.stack);
    //console.log(error)

    var date= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var s = date + ' '+error.stack+"\n";
    fs.appendFile('errors.log',s, function (err, data) {
        if (err) throw error;
    });
    res.status(500);
    res.send( {'error': error.message});
    // send back a 500 with a generic message

    /*res.status(500);
    res.send( {'error': error.message});*/
});


// Start server
/*app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});*/


server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


/*watch('./data/config.json', function(filename) {
    delete require.cache[require.resolve('./data/config.json')];
    console.log(require.resolve('./data/config.json'));
    //config = require('./data/config.json')
    console.log(filename, ' changed.');

});*/


// Expose app
//exports = module.exports = app;