import { Configuration } from 'webpack';

import { resolve } from 'node:path';

import env from './env';

env();

const getMode = () => {
    const appEnv = process.env.APP_ENV || "development";
    return ["none", "development", "production"].includes(appEnv) ? appEnv : "development";
}

const config: Configuration = {
    mode: getMode() as ("none" | "development" | "production"),
    entry: resolve(process.cwd(), "./app/index.ts"),
    output: {
        path: resolve(process.cwd(), 'public'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        compilerOptions: {
                            target: 'es6',
                            module: 'es6'
                        },
                    },
                }
            }
        ]
    },
};

export default config;
