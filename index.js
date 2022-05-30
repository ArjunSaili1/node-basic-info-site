const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 9999;
app.listen(PORT);

app.get('*', function(req, res){
    if(req.url == "/"){
        res.sendFile(path.join(__dirname, 'public', '/index.html'))
    }
    if(req.url == "/about" || req.url == "/contact-me"){
        res.sendFile(path.join(__dirname, 'public', `${req.url}.html`))
    }
    else{
        res.sendFile(path.join(__dirname, 'public', '/404.html'))
    }
})