const { resolve } = require("path");

module.exports = {
    mode: "development",
    entry: "./app/index.ts",
    output: {
        path: resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve: { extensions: ['.ts', '.js'] },
    module: { rules: [{
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }]},
};
