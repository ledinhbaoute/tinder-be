var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  method: 'POST',
  hostname: 'e1kye2.api.infobip.com',
  path: '/2fa/2/pin/{pinId}/verify',
  headers: {
    Authorization:
      'App 6cc8163973655ce9fc32006977be0aa4-194fde1d-a007-44cb-a448-3b66e08e4598',
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
    console.log(body.toString());
  });

  res.on('error', function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  pin: '{{pinCode}}',
});

req.write(postData);

req.end();
