const { GENESIS_DATA } = require("./config");

class Block{
    constructor({timestamp,lastHash,data,hash}){
        this.timestamp=timestamp;
        this.lastHash=lastHash;
        this.data=data;
        this.hash=hash;
    }
    static genesis(){
        return new Block(GENESIS_DATA);
    }
}

module.exports=Block;