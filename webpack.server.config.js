const path = require('path');

module.exports = {
    entry: {
        server: './src/server.js'
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: '[name].js'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
