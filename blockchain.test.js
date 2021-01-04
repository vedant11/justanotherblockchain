const Blockchain=require('./blockchain');
const Block=require('./block');
describe('Blockchain', () => {
    const newBlockchain=new Blockchain();
    it('adds new blockchain instance', () => {
        expect(newBlockchain instanceof Blockchain).toBe(true);
    });
    it('has `chain` as an Array instance', () => {
        expect(newBlockchain.chain instanceof Array).toBe(true);
    });
    it('starts with genesis block', () => {
        expect(newBlockchain.chain[0]).toEqual(Block.genesis());
    });
    it('adds new block successfully', () => {
        const newData='newdata';
        newBlockchain.addBlock({
            data:newData,
        });
        expect(newBlockchain.chain[newBlockchain.chain.length-1].data)
        .toEqual(newData);
    });
    
});