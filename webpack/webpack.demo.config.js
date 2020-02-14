const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    //页面入口文件配置
    entry: './src/app.js',
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, '../demo'),
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    }
};