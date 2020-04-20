const path = require('path');
const nodeExternals = require('webpack-node-externals');


const config = {
    mode: 'production',
    target: 'node',
    entry: path.resolve(__dirname, 'src/index.js'),

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },

    resolve: {
        modules: [
            'node_modules',
        ],
        extensions: ['.js'],
    },
    externals: [nodeExternals()],
};


module.exports = config;
