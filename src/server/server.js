const express = require('express');
const app = express();
const fs = require('fs')
const cors = require('cors');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        bodyParser = require('body-parser')
let urls = [[11111,"https://t99323py.beget.tech/"],[11112,"https://kun.uz/"],[11113,"https://youtube.com/"]];
app.use(express.json());
app.use(bodyParser());
app.use(cors()); 
dirN = __dirname.slice(0,__dirname.length-7)+'/client';
app.use(express.static(dirN))
app.listen(2000,()=>{
    console.log(`Server is running on port: 2000`);
    console.log(dirN)                                                                                                                                                                                                                                                                              
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
app.get('/',(req,res)=>{                                                                                                                                                                                                            
    console.log('Server is working...');
    res.sendFile('index.html')
});
app.post('/fUrl',(req,res)=>{
    console.log('Habar keldi');
    console.log(req.body)
    len = urls.length;
    idNumber = (urls[len-1][0]+1)
    console.log(idNumber)
    newUrl = [idNumber, req.body.url]
    urls.push(newUrl)
    shortUrl = {
        done: true,
        url: `?id=${idNumber}`,
        host: 200,
        fU: `http://localhost:2000/shUrl?id=${idNumber}`
    }
    setTimeout(() => {
        res.send(shortUrl);
    }, 1000);
})
app.get('/shUrl',(req,res)=>{
    id = Number(req.query.id);
    let fullUrl
    console.log(id);
    if(urls[id-11111]!=undefined){
        res.write('<script> window.open(\''+urls[id-11111][1]+'\',\"_parent\")</script>')
    } else{
        res.sendFile('not-found.html', {root: './src/client'})
    }    
})