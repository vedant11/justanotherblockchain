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
            lastBlock:this.chain[this.chain.length-1],
            data
        });
        this.chain.push(newBlock);
    }

    replaceChain(newChain){
        if (this.chain.length>newChain.chain.length){
            console.log(`length isn't valid for replacement `);
            return;
        }
        if (Blockchain.isValidBlockchain(newChain)){
            console.log(`new chain is invalid`);
            this.chain=newChain;
        }
        return;
    }

    static isValidBlockchain(blockchain){
        const blocks=blockchain.chain;
        // checking if genesis block is valid
        // Using JSON stringify to avoid instance ref comparision
        if (JSON.stringify(blocks[0])!==JSON.stringify(Block.genesis()))
            return false;
        let lastHash=blocks[0].hash;
        blocks.shift(); // deletes first elem
        for (let index = 0; index < blocks.length; index++) {
            const block = blocks[index];
            if (block.lastHash!==lastHash){
                console.log('returning false');
                return false;}
            lastHash=block.hash;
            if (Block.hashIsValid(block)===false)
                return false;
        }
        return true;
    }
}

module.exports= Blockchain;