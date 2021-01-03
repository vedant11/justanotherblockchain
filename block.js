const { GENESIS_DATA } = require("./config");

class Block{
    constructor({timestamp,lastHash,data,hash}){
        this.timestamp=timestamp;
        this.lastHash=lastHash;
        this.data=data;
        this.hash=hash;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({lastBlock,data}){
        return new this({
            lastHash:lastBlock.hash,
            data:data,
            timestamp:Date.now(),
            //hash left
        })
    }
};

module.exports=Block;