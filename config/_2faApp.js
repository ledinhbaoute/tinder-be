var https = require('follow-redirects').https;
var fs = require('fs');

const { SMS_API_KEY, SMS_HOST_NAME } = process.env;

var options = {
  method: 'POST',
  hostname: SMS_HOST_NAME,
  path: '/2fa/2/applications',
  headers: {
    Authorization: `App ${SMS_API_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  maxRedirects: 20,
};

function _2faApp() {
  return new Promise((resolve, reject) => {
    var req = https.request(options, function (res) {
      var chunks = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        var body = Buffer.concat(chunks);
        var appId = JSON.parse(body).applicationId;
        resolve(appId);
      });

      res.on('error', function (error) {
        console.error(error);
        reject(error);
      });
    });

    var postData = JSON.stringify({
      name: '2fa application',
      enabled: true,
      configuration: {
        pinAttempts: 10,
        allowMultiplePinVerifications: true,
        pinTimeToLive: '15m',
        verifyPinLimit: '1/3s',
        sendPinPerApplicationLimit: '100/1d',
        sendPinPerPhoneNumberLimit: '10/1d',
      },
    });

    req.write(postData);
    req.end();
  });
}

module.exports = _2faApp;
