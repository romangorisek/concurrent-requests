const https = require('https');

exports.simpleNativeGetRequest = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        console.log('request starting');
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          setTimeout(() => {
            console.log('request done');
            resolve(JSON.parse(data));
          }, 2000 * Math.random()); // Simulate longer response times for some requests
        });
      })
      .on('error', (err) => {
        reject(err);
      })
      .end();
  });
};