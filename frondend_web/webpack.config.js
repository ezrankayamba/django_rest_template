var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        config: JSON.stringify({
            apiUrl: 'http://localhost:8000',
            clientId:'v0WJqw2wvL7qx422lcSgyAyeUTj2zRbIHuuq0l2d',
            clientSecret:'JoBlLNarJiW95025YOrURl7SGduapkTVDJi2gfNAEKIL5ezFuDLIWijVedwtNXshAjAmLro18w9ye9qm1gp5jmF7JIHL76zZYm6qihhUIbHuQmMpPJdZfYDyKdgiqfzB'
        })
    }
}