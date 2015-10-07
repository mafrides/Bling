var express = require('express')
  , path = require('path')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , request = require('request')

var app = express()
  , router = express.Router()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use('/', express.static(path.join(__dirname, 'bower_components')))
app.use('/', express.static(path.join(__dirname, 'angular_app')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes

// The Bing API

// Usage: attach ?query=<query> and optionally market=<market>
router.route('/bing/:service?')
  .get(function (req, res, next) {
    var bingAPIRoot = 'https://api.datamarket.azure.com/Bing/Search'
      , service = req.params.service || 'Web'
      , format = 'json'
      , query = encodeURIComponent("'" + (req.query.query || "") + "'")
      , market =  encodeURIComponent("'" + (req.query.market || 'en-us') + "'")
      , uri = bingAPIRoot +
              '/' + service +
              '?$format=' + format +
              '&Query=' + query + 
              '&Market=' + market

    // I would usually get the key from a config file;
    // This is a free account key I generated for this demo
    // INSERT BING API KEY HERE
    var bingKey =  ''
      , options = 
          { method: 'GET'
          , uri: uri
          , headers: 
              { Authorization: 'Basic ' + new Buffer(bingKey + ":" + bingKey).toString('base64') }
          }

    request(options, function (error, response, body) {
      if (error) {
        return next(error)
      }

      res.status(response.statusCode).json(body)
    })
  })

// The Angular app
router.route('/')
  .get(function (req, res) {
     res.render('angular_entry', { title: 'Simple Bing Clone' })
  })

app.use(router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', { message: err.message
                        , error: err
                        }
    )
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message
                      , error: {}
                      }
  )
})

var port = process.env.PORT || 3000
app.set('port', port)
app.listen(port, function() {
  console.log("Simple Bing Clone listening on port " + port);
})