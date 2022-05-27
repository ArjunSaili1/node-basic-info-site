import { createServer } from 'http';
import { readFile as _readFile } from 'fs/promises';

const server = createServer((req, res)=>{
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
            file = await _readFile("./index.html", {encoding: "utf8"})
        }
        else{
            file = await _readFile(`.${path}.html`, {encoding: "utf8"})
        }
        return {file: file, code: 200}
    }
    catch (err){
        console.log(err)
        const unknownPageFile = await _readFile("./404.html", {encoding: "utf8"})
        return {file: unknownPageFile, code: 404};
    }
}