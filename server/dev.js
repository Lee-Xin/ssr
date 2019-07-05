const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const config = require('./config.js')
const app = express();
const url = require('url');
const port = config.port || 3000;
const fs = require('fs');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.set('view engine', 'ejs');


const webpack = require('webpack');

const webpackDevConfig = require('../webpack.config');
const compiler = webpack(webpackDevConfig);

/*const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: 'errors-only',
}));
app.use(webpackHotMiddleware(compiler, {heartbeat: 1000, noInfo: true}));*/

app.get('/main.html', (req, res, next) => {
    const pt = path.join(__dirname, 'main.ejs');
    compiler.inputFileSystem.readFile(path.join(__dirname, 'dist/main.ejs'), (err, result) => {
        if (err) return (next(err));
        fs.writeFile(pt, result, function() {
            res.render(pt, {
                test: 'test,112233',
            });
        });
    });
})
app.get('/home.html', (req, res, next) => {
    const pt = path.join(__dirname, 'home.ejs');
    compiler.inputFileSystem.readFile(path.join(__dirname, 'dist/home.ejs'), (err, result) => {
        if (err) return (next(err));
        fs.writeFile(pt, result, function() {
            res.render(pt, {
                abc: '我是home获取的数据',
            });
        });
    });
})

app.use('/', express.static(path.resolve(__dirname, './dist')));

app.all('/*', (req,res,next) => {
    let name = url.parse(req.url, true).path.split('?')[0];
    name === '/' && (name = '/main.html');
    const file = path.join(__dirname, 'dist/' + name);
    const fileName = file.replace('html', 'ejs');
    compiler.inputFileSystem.readFile(fileName, (err, result) => {
        if (err) return (next(err));
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
})

const App = app.listen(port, () => {
    let host = App.address().address;
    if(host === '::'){
        host = 'localhost'
    }
    let port = App.address().port;
    console.log('\x1B[32m%s\x1b[39m', `Server Running at localhost http://${host}:${port}`);
})
