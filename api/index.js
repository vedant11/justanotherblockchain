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
    // to broadcast change in chain to every peer
    pubsub.broadcastBlockchain();
    res.redirect('/api/blocks');
});

let PEER_PORT;
if (process.env.GENERATE_PEER_PORT==='true')
    PEER_PORT=PORT+Math.ceil(Math.random()*1000);
if (PEER_PORT===undefined)
    PEER_PORT=PORT;
app.listen(PEER_PORT,()=>{
    console.log(`app started at ${PEER_PORT} `);
});