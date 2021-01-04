const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

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
        const lastHash=lastBlock.hash;
        const timestamp=Date.now();
        return new this({
            lastHash,
            data,
            timestamp,
            hash:cryptoHash(timestamp,data,lastHash),
        })
    }
    static hashIsValid(block){
        return block.hash===cryptoHash(
            block.timestamp,block.data,block.lastHash
            );
    }
};

module.exports=Block;