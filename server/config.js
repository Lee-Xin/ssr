let dev = {
    port: 3000,//服务端口
    env: 'dev',
};

let config = {
    development: dev
}

module.exports = config[process.env.NODE_ENV || 'development'];
