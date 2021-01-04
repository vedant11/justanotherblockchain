const Blockchain=require('./blockchain');
const Block=require('./block');
describe('Blockchain', () => {
    let newBlockchain;

    beforeEach(() => {
        // To give every desc block a new instance of blockchain
        newBlockchain=new Blockchain();
    });

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
    describe('isValidBlockchain()', () => {
        describe('first block is not genesis', () => {
            it('returns false', () => {
                newBlockchain.chain[0]= {data:'fake-block'};
                expect(Blockchain.isValidBlockchain(newBlockchain)).toBe(false);
            });
        });
        describe('when block has mulitple blocks', () => {
            beforeEach(() => {
            newBlockchain.addBlock({data:'Block2'});
            newBlockchain.addBlock({data:'Block3'});
            newBlockchain.addBlock({data:'Block4'});
            });
            describe('and lastHash of a block has been tampered', () => {
                it('should return false', () => {
                    newBlockchain.chain[1].lastHash='totally tampered hash';
                    expect(Blockchain.isValidBlockchain(newBlockchain)).toBe(false);
                });
            });
            describe('data of a block has been tampered', () => {
                it('should return false', () => {
                    newBlockchain.chain[2].data='tampered data';
                    expect(Blockchain.isValidBlockchain(newBlockchain)).toBe(false);
                });
            });
            describe('chain has no invalid blocks', () => {
                it('should return true', () => {
                    expect(Blockchain.isValidBlockchain(newBlockchain)).toBe(true);
                });
            });
        });
    });
});