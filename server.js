require('dotenv').config()
var exec = require('child_process').exec;

var fs = require("fs");

var cors = require('cors')
process.env.NODE_ENV = "development";
'use strict';

const express = require('express');
var bodyParser = require('body-parser')

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors())
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.get("/webhook", (req, res) => {

      function execCallback(err, stdout, stderr) {
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
      }


      // reset any changes that have been made locally
      exec('git -C ~/projects/wackcoon-device reset --hard', execCallback);

      // and ditch any files that have been added locally too
      exec('git -C ~/projects/wackcoon-device clean -df', execCallback);

      // now pull down the latest
      exec('git -C ~/projects/wackcoon-device pull -f', execCallback);

      // and npm install with --production
      exec('npm -C ~/projects/wackcoon-device install --production', execCallback);

      // and run tsc
      exec('tsc', execCallback);


    }

    app.listen(PORT, HOST); console.log(`Running on http://${HOST}:${PORT}`);
