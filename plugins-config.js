const MyPlugin = require('./myPlugin');
const webInfoArray = require('./webInfoArray.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack')

const pluginsConfig = [
    new MyPlugin(webInfoArray),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
]

function getPlugins(){
    webInfoArray.forEach(info => {
        pluginsConfig.push(
            new HtmlWebpackPlugin({
                filename: `${info.html}.ejs`,
                inject: true,
                template: `./html/${info.html}.html`,
                chunks: [info.html]
            })
        );
    });
    if (process.env.NODE_ENV === 'dev') {
        pluginsConfig.push(
            new webpack.NamedModulesPlugin()
        );
        pluginsConfig.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }
    return pluginsConfig;
}

module.exports = getPlugins()
