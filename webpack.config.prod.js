const path = require('path');

module.exports = {
    mode: 'production',

    entry: './src/index.ts',

    output: {
        filename: 'tensor-arena.js',
        path: path.resolve('dist/')
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
        contentBase: path.join(__dirname, 'preview/'),
    }
};
