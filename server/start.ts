import { webpack } from 'webpack';
import WebpackDevServer, { Configuration } from 'webpack-dev-server';

import 'colors';

import config from './utils/webpack';

const compiler = webpack(config);
const devServer = config.devServer as Configuration;

// start webpack server
const server = new WebpackDevServer(devServer, compiler);

server.startCallback(() => {
    console.clear();
    console.log("Server running!".green);
});
