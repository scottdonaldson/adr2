var express = require('express'),
    bodyParser = require('body-parser');

// Set up app
var app = module.exports = express();

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use( allowCrossDomain );
app.use( bodyParser.json({
    limit: 500000000
}) );
app.use( bodyParser.urlencoded({
    extended: true,
    limit: 500000000
}) );

// Port and views
app.set( 'port', (process.env.PORT || 5000) );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );

// API and routing
var api = require('./api')(app);

// GO GO GO!
app.listen(app.get('port'));
