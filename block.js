class Block{
    constructor({timestamp,lastHash,data,hash}){
        this.timestamp=timestamp;
        this.lastHash=lastHash;
        this.data=data;
        this.hash=hash;
    }
}

const block1=new Block({
    timestamp:'01/01/01',
    lastHash:'hash1',
    data:'data',
    hash:'thishash'
});
console.log(block1);