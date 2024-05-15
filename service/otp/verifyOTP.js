var https = require('follow-redirects').https;
var fs = require('fs');

const { SMS_API_KEY, SMS_HOST_NAME } = process.env;

function verifyOTP(pin, pinId) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      hostname: SMS_HOST_NAME,
      path: `/2fa/2/pin/${pinId}/verify`,
      headers: {
        Authorization: `App ${SMS_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function (chunk) {
        var body = Buffer.concat(chunks);
        var result = JSON.parse(body);
        resolve({
          verified: result.verified,
          attemptsRemaining: result.attemptsRemaining,
        });
        console.log(body.toString());
      });

      res.on('error', function (error) {
        console.error(error);
        reject(error);
      });
    });

    var postData = JSON.stringify({
      pin: pin,
    });

    req.write(postData);

    req.end();
  });
}

module.exports = verifyOTP;
