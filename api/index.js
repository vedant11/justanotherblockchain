const express=require('express');
const Blockchain=require('../blockchain_logic/blockchain');
const {PORT}= require('./api_config');
const bodyParser=require('body-parser');
const PubSub = require('./pubsub');

const app = express();
const blockchain=new Blockchain();
const pubsub=new PubSub({blockchain});
setTimeout(() => {
    pubsub.broadcastBlockchain()
}, 1000);
app.use(bodyParser.json());


app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain);
});

app.post('/api/mine',(req,res)=>{
    const {data}=req.body;
    blockchain.addBlock({data});
    res.redirect('/api/blocks');
});


app.listen(PORT,()=>{
    console.log(`app started at ${PORT} `);
});