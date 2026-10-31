import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'supervisor-inbox-bridge',
        configureServer(server) {
          server.middlewares.use('/api/supervisor-inbox', (req, res) => {
            const inboxPath = path.resolve(__dirname, 'docs/supervisor-inbox.md');
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', () => {
                try {
                  const parsed = JSON.parse(body);
                  fs.writeFileSync(inboxPath, parsed.content || '', 'utf-8');
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: true, savedAt: new Date().toISOString() }));
                } catch (err) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ ok: false, error: String(err) }));
                }
              });
              return;
            }
            if (req.method === 'GET') {
              const content = fs.existsSync(inboxPath) ? fs.readFileSync(inboxPath, 'utf-8') : '';
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, content }));
              return;
            }
            res.statusCode = 405;
            res.end();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
