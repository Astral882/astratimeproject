const http = require('http');
const fs = require('fs');
const path = require('path');
const homeRouter = require('./routes/home');
const apiRouter = require('./routes/api');

const server = http.createServer((req, res) => {
  // 静态文件处理
  if (req.url.startsWith('/public')) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        // 根据文件类型设置 Content-Type
        const ext = path.extname(filePath);
        const contentType = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript'
        }[ext] || 'text/plain';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
  // 路由处理
  else if (req.url === '/') {
    homeRouter.handleRequest(req, res);
  } else if (req.url === '/api') {
    apiRouter.handleRequest(req, res);
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});