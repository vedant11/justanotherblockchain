const Block = require('./block');

class Blockchain{
    constructor(){
        // Array of `Block`s
        this.chain=[];

        const genesisBlock=Block.genesis();
        this.chain.push(genesisBlock);

    }
    addBlock({data}){
        const newBlock=Block.mineBlock({
            lastBlock:this.chain[-1],
            data
        });
        this.chain.push(newBlock);
    }
}

module.exports= Blockchain;