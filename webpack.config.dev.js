const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        TensorComponentWorker: './src/Workers/Standalone/TensorComponentWorker.ts', // TODO: output every standalone worker.
        TensorArena: './src/index.ts',
    },

    output: {
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ],
    },

    resolve: {extensions: [".ts", ".js"]},

    devtool: false, // source maps are so slow to recompile :/

    devServer: {
        static: {
            directory: path.join(__dirname, 'preview/'),
        },
        compress: false,
        host: '0.0.0.0',
        port: 8080,
    }
};
