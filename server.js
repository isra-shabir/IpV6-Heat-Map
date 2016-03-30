var express = require("express");
var path = require("path");
var bodyParser = require("body-parser"); 

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*
*  "/"                                          // edit this to describe
*
*/

 app.get('/', function(req, res) {

        var fs = require('fs');
        var parse = require('csv').parse; // server side module to parse a csv file.

        var totalCount; // total lat,longs
        var globalData; // our parsed data array
        var IPTable;  // our desired values (lat,long, & IPv6 of these lat,long)
        var densityHash; // count of IPv6 for each lat, long

        var parser = parse(function(err, data){

          totalCount = data.length;
          globalData = data;

          IPTable = []; // table: [[IpV6, [lat, long]], ... , [[IpV6],[lat,long]]]
          densityHash = {}; // hash: {[lat,long] : count}
          for (var i =0; i < globalData.length; i++){

            IPTable.push([globalData[i][1], [globalData[i][7], globalData[i][8]]]);
            latLong = [IPTable[i][1]];

            if (densityHash[latLong]) {
              densityHash[latLong] +=1;
            }
            else {
              densityHash[latLong] = 1;
          }
          }
        });

        fs.createReadStream('file.csv').pipe(parser);

        res.send(densityHash); 
});


/*  "/data+paramaters" // define what the endpoint is here! 
 *   
 */

app.get("/data", function(req, res) { 


  // return the list 

});
