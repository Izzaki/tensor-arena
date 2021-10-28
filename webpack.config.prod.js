const path = require('path');

module.exports = {
    mode: 'production',

    entry: './src/index.ts',

    output: {
        filename: 'tensor-arena.js',
        path: path.resolve('public/')
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

    resolve: {extensions: [".ts", ".js"]},

    devServer: {
    }
};
