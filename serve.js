const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4200;
const DIST_DIR = path.join(__dirname, 'dist', 'cyber-portfolio');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname;

  let filePath = path.join(DIST_DIR, pathname);

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Si no encuentra el archivo, servir index.html (para rutas de Angular)
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', '✅ Servidor iniciado correctamente');
  console.log('\x1b[36m%s\x1b[0m', `🌐 Abre tu navegador en: http://localhost:${PORT}`);
  console.log('\x1b[33m%s\x1b[0m', '📁 Sirviendo archivos desde:', DIST_DIR);
  console.log('\x1b[90m%s\x1b[0m', '\nPresiona Ctrl+C para detener el servidor');
});
