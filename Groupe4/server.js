import http from 'http';
import path from 'path';
import fs from 'fs';

const startServer = (port = 3000) => {
    const DIST_DIR = './dist';

    const SERVER = http.createServer((request, response) => {

        let filePath = request.url === '/' ? '/index.html' : request.url;
        const fullPath = path.join(process.cwd(), DIST_DIR, filePath);

        fs.readFile(fullPath, (err, content) => {
            if (err) {
                response.writeHead(404);
                response.end('Erreur 404 : Page introuvable !');
                return;
            }

            const EXT = path.extname(fullPath);

            response.writeHead(200, {
                'Content-Type': EXT === '.html' ? 'text/html' : 'text/plain'
            });

            response.end(content);
        });
    });

    SERVER.listen(port, () => {
        console.log(`🌍 Serveur démarré sur http://localhost:${port}`);
        console.log(`💡 Ctrl+C pour arrêter`);
    });
};

export { startServer };