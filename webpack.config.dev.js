const path = require('path');

module.exports = {
    mode: 'development',

    entry: './src/index.ts',

    output: {
        filename: 'tensor-arena.js',
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
    }
};
