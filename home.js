const fs = require('fs');
const path = require('path');

module.exports = {
  handleRequest: (req, res) => {
    // 读取您的HTML文件
    const htmlPath = path.join(__dirname, '../public/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  }
};