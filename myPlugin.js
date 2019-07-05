const fs = require('fs');
const path = require('path');

function MyPlugin(data){
    this.infoArr = data
}

MyPlugin.prototype.apply = function(compiler){
    const infoArr = this.infoArr
    compiler.plugin('compilation', function (compilation) {
        if(this.instance) return;
        this.instance = true;
        let html = fs.readFileSync('./index.html', 'utf-8');
        const dir = path.join(__dirname, 'html');
        fs.readdir(dir, (err) => {
            if(err){
                return fs.mkdir(dir, (err) => {
                    handle.call(this,infoArr,html)
                })
            }
            handle.call(this,infoArr,html)
        })
    })
}

function handle(infoArr,html){
    infoArr.forEach((info,index) => {
        const url = `./templates/${info.html}.html`;
        const tmp = fs.readFileSync(url, 'utf-8');
        let newHtml = html.replace(`<${info.html}_html/>`,tmp)
            .replace(/{{title}}/, info.title)
            .replace(/{{description}}/, info.description)
            .replace(/{{keywords}}/, info.keywords)
        fs.writeFileSync(`./html/${info.html}.html`, newHtml)
    })
}

module.exports = MyPlugin
