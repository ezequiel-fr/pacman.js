import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve } from 'node:path';

import { WebSocketServer } from 'ws';

import env from './utils/env';

// Config env
env();

const server = createServer((req, res) => {
    const endRes = (code: number, message?: string) => {
        res.statusCode = code;
        if (message) res.statusMessage = JSON.stringify({ message });
        return res.end();
    }

    if (String(req.method).toUpperCase() === "GET") {
        try {
            const url = req.url || "/";
            const path = resolve(process.cwd(), 'public', (url === "/" ? "index.html" : "./" + url));

            if (existsSync(path)) {
                res.statusCode = 200;
                return res.end(readFileSync(path));
            } else return endRes(404, "Not found");
        } catch (error) {
            return endRes(500, "An internal error has occured.");
        }
    } else endRes(401, "Unauthorized");
});
server.listen(1002, () => console.log("Server running"));

new WebSocketServer({ server }).on('connection', ws => {
    ws.send(JSON.stringify({ type: "reload", data: null }));

    // ws.on('message', message => {});

    ws.on('error', console.error);
    ws.on('unexpected-response', console.error);
}).on('error', console.error);
