const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getPlugins = require('./plugins-config');

module.exports = {
    entry: {
        main: './src/main.js',
        home: './src/home.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        ie: 8
                                    }
                                }
                            ]
                        ]
                    }
                },
                exclude: /(node_module | bower_components)/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader,less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /.woff|.woff2|.svg|.eot|.ttf/,
                use: "url-loader?prefix=font/&limit=10000"
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    publicPath: "/",
                    name: path.posix.join("assets","img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: getPlugins,
    devtool: process.env.NODE_ENV === "production" ? false : "eval",
    devServer: {
        contentBase: "./dist"
    },
    optimization: {
        minimizer: process.env.NODE_ENV === "production"  ? [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: true,
                    keep_fnames: false,
                }
            })
        ] : []
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "server/dist"),
        publicPath: "/"
    },
    mode: "production"
}
