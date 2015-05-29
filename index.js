var name = 'putfile'
var debug = require('debug')(name)
var express = require('express')
var multer = require('multer')
var assert = require('assert')
var path = require('path')
var fs = require('fs')
var serveIndex = require('serve-index')

var app = express()
var port = process.argv[2] || 80
var dir = '.'

var multipart = multer({
      dest: dir
    , rename: function(fieldname, filename) {
        return fieldname
    }
    , onParseEnd: function(req, next) {
        next()
    }
    , onError: function(err, next) {
        next(err)
    }
})

app
    // static server 
    .use(express.static(dir))
    .use(serveIndex(dir))

    // upload
    .use(function(req, res, next) {
        debug('enter', req.method)
        next()
    })
    .use(multipart)
    .use(function(req, res, next) {
        var files = Object.keys(req.files || [])
        if (files.length) return success(files, res)

        if (/POST|PUT/.test(req.method)) {
            var filename = getFilename(req.path)
            debug('filename: %s, path: %s', filename, req.path)
            return req
                .on('end', function() {
                    debug('end')
                    files.push(filename)
                    success(files, res)
                })
                .on('error', next)
                .pipe(fs.createWriteStream(filename))
        }

        next(new Error('Get nothing'))
    })
    .use(function(err, req, res, next) {
        if (err) {
            debug('err: %o', err)
            res.status(400).send(err.message)
        }
    })
    .listen(port, function(err) {
        console.log('listen on %d', port)
    })

function getFilename(pathname) {
    var ret = path.basename(pathname)
    if (!ret) {
        ret = 'unnamed-' + (+new Date)
    }
    return ret
}

function success(files, res) {
    var txt = files.join('\n') + '\nuploaded success!\n'
    res.send(txt)
}
