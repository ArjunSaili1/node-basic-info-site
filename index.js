const http = require('http');
const fs = require('fs/promises');

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    readFile(req.url).then(({code, file})=>{
        res.statusCode = code
        res.end(file)
    })
}).listen(8080)

async function readFile(path){
    try{
        let file;
        if(path === "/"){
            file = await fs.readFile("./index.html", {encoding: "utf8"})
        }
        else{
            file = await fs.readFile(`.${path}.html`, {encoding: "utf8"})
        }
        return {file: file, code: 200}
    }
    catch (err){
        const unknownPageFile = await fs.readFile("./404.html", {encoding: "utf8"})
        return {file: unknownPageFile, code: 404};
    }
}