import { resolve as path } from 'node:path';

import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';

import dotenvConfig from './env';

// add .env files to the current configuration
dotenvConfig();

export enum Modes {
    development = "development",
    production = "production",
    none = "none",
}

// get the mode used to compile
const mode = (() => {
    const appEnv = process.env.APP_ENV || Modes.development;

    return Object.values(Modes).includes(appEnv as Modes)
        ? appEnv
        : Modes.development;
})() as Modes;

// resolve snippet
const resolve = (...paths: string[]) => path(process.cwd(), ...paths);

// export configuration
const config: Configuration = {
    devServer: {
        client: {
            logging: 'none',
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true,
            },
            progress: true,
            reconnect: true,
        },
        compress: true,
        hot: true,
        liveReload: true,
        open: false,
        port: process.env.PORT || 1002,
        static: {
            watch: true,
        },
        watchFiles: {
            paths: ['public', 'src']
        },
    },
    entry: [
        resolve('./public/style.scss'),
        resolve('./src/index.ts'),
    ],
    mode,
    module: {
        rules: [
            // JS/TS Compiler
            {
                exclude: /build|dist|node_modules|server|types/,
                test: /\.(js|mjs|ts)$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            target: "es6",
                            module: "es6",
                        },
                        transpileOnly: true,
                    }
                },
            },
            // SASS preprocessor
            {
                test: /\.(css|s[ac]ss)$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            // Exclude js files when reload css files
            {
                exclude: [/^$/, /\.(js|mjs|ts)$/, /\.html$/, /\.json$/],
                type: 'asset/resource',
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: resolve('public'),
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: 'head',
            scriptLoading: 'blocking',
            template: 'public/index.html',
        }),
        new MiniCSSExtractPlugin({
            filename: 'style.css',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    stats: 'errors-only',
};

export default config;
