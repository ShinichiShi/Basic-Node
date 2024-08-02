const http = require('http')
const fs = require('fs')
const url = require('url')

const pg404 = fs.readFileSync('404.html','utf-8')

http
    .createServer((req,res)=>{ 
        const query = url.parse(req.url,true)

        let filename =''
        if(query.pathname==='/'){
            filename='.'+'/index.html'
        }
        else {
            filename='.'+query.pathname
        }

        fs.readFile(filename,(err,data)=>{
            if(err){
                res.writeHead(404,{'Content-Type':'text/html'})
                res.write(pg404)
                return res.end()
            }
            else{
                res.write(data)
                return res.end()
            }
        })
    })
    .listen(3000)

// const express = require('express')
// const app = express()
// const path=require('path')
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'index.html'))
// })
// .get('/index.html',(req,res)=>{
//     res.sendFile(path.join(__dirname,'index.html'))
// })
// .get('/about.html',(req,res)=>{
//     res.sendFile(path.join(__dirname,'about.html'))
// })
// .get('/contact.html',(req,res)=>{
//     res.sendFile(path.join(__dirname,'contact.html'))
// })
// .get('/:file',(req,res)=>{
//     res.sendFile(path.join(__dirname,'404.html'))
// })
// .listen(3000,()=>{console.log('listening')})

