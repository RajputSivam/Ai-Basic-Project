const http = require('http');
const https = require('https');
const fs = require('fs');

 const API_KEY = ' PASTE HERER API KEYS';// As my api is paid

const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        }
      };
      const apiReq = https.request(options, apiRes => {
        let data = '';
        apiRes.on('data', chunk => data += chunk);
        apiRes.on('end', () => {
          res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
          res.end(data);
        });
      });
      apiReq.on('error', err => { res.writeHead(500); res.end(JSON.stringify({error:err.message})); });
      apiReq.write(body);
      apiReq.end();
    });
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'Content-Type'});
    res.end();
  }
});


server.listen(3000, () => console.log(' Open: http://localhost:3000'));
