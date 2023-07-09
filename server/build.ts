import { existsSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'node:fs';
import { join, resolve as path } from 'node:path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration, webpack } from 'webpack';

import 'colors';

import config from './utils/webpack';

// resolve snippet
const resolve = (...paths: string[]) => path(process.cwd(), ...paths);
const buildDir = resolve("build");

// create build configuration
const { devServer, plugins, ..._config } = config;

const webpackConfig: Omit<Configuration, 'devServer'> = {
    ..._config,
    mode: 'production',
    output: {
        filename: 'assets/[name].[contenthash].js',
        path: buildDir,
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: 'head',
            scriptLoading: 'blocking',
            template: 'public/index.html',
        }),
        new MiniCSSExtractPlugin({
            filename: 'assets/[name].[contenthash].css',
            ignoreOrder: true,
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: ['!*.scss'],
                cleanOnceBeforeBuildPatterns: ['**/*', '!*.css'],
            }),
            new CSSMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
};

// remove the last build directory
if (existsSync(buildDir)) {
    const files = readdirSync(buildDir);

    for (const file of files) {
        const filePath = join(buildDir, file);
        const stats = statSync(filePath);

        if (stats.isFile()) {
            unlinkSync(filePath);
        } else if (stats.isDirectory()) {
            readdirSync(filePath).forEach(subFile => unlinkSync(join(filePath, subFile)));
            rmdirSync(filePath);
        }
    }
}

// compile js
const compiler = webpack(webpackConfig);

compiler.run(err => {
    // dump errors
    if (err) throw err;

    // and delete sass files output
    const sassFiles = readdirSync(buildDir).filter(f => /\.s[ac]ss$/.test(f));
    for (const file of sassFiles) unlinkSync(join(buildDir, file));

    // end script
    console.log("Build version has been correctly created!".green);
});
