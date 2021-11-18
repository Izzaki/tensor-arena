const path = require('path');

module.exports = {
    mode: 'production',

    entry: {
        TensorComponentWorker: './src/Workers/Standalone/TensorComponentWorker.ts', // TODO: output every standalone worker.
        TensorArena: './src/index.ts',
    },

    output: {
        filename: '[name].js',
        path: path.resolve('public/'),
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    devtool: false,

    resolve: {extensions: [".ts", ".js"]},
};
