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
        const {hash,difficulty}=lastBlock;
        let newHash;
        let nonce=0;
        let timestamp;
        do{
            timestamp=Date.now();
            // hash here is the lastHash
            newHash=cryptoHash(timestamp,hash,nonce,difficulty,data);
            nonce++;
        }
        while(newHash.substring(0,difficulty)!==
            '0'.repeat(difficulty));

        return new this({
            lastHash:hash,
            data,
            timestamp,
            nonce:--nonce,
            difficulty,
            hash:newHash            
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