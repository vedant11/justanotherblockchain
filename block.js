const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block{
    constructor({timestamp,lastHash,data,hash,nonce,difficulty}){
        this.timestamp=timestamp;
        this.lastHash=lastHash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
        this.hash=hash;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({lastBlock,data}){
        const {hash,nonce,difficulty}=lastBlock;
        const timestamp=Date.now();
        return new this({
            lastHash:hash,
            data,
            timestamp,
            nonce,
            difficulty,
            hash:cryptoHash(
                timestamp,
                data,
                hash,
                nonce,
                difficulty
            ),
        })
    }
    static hashIsValid(block){
        const {timestamp,lastHash,nonce,difficulty,data}=block;
        return block.hash===cryptoHash(
            timestamp,
            lastHash,
            nonce,
            difficulty,
            data
        );
    }
};

module.exports=Block;