import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { resolve as path } from 'node:path';

import webpack from 'webpack';

import config from './utils/webpack.config';

function clearAndLog(...args: any[]) {
    console.clear();
    console.log(...args);
};

function spawnNode() {
    /** New process */
    const pr = spawn(process.argv0, [path(__dirname, './server')]);

    pr.stdout.pipe(process.stdout);
    pr.stderr.pipe(process.stderr);

    pr.on('close', code => code !== null && process.exit(code));

    return pr;
}

const compile = async () => new Promise((resolve, reject) => {
    const compiler = webpack(config);

    compiler.run((err, stats) => {
        if (err) reject(err);
        resolve(stats?.toString({ colors: true }));
    });
});

const watcher = watch(path(process.cwd(), 'app'), { recursive: true });

let childProcess: ChildProcessWithoutNullStreams;

// websocket
watcher.on('change', async (_, filename) => {
    clearAndLog("Compiling...");
    clearAndLog(await compile());

    if (filename.toString().endsWith('.ts') && childProcess) {
        childProcess.kill("SIGKILL");
        childProcess = spawnNode();
    } else if (childProcess === undefined) {
        childProcess = spawnNode();
    }
});
watcher.emit('change', null, "index.ts");
