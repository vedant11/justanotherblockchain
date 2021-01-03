const Block=require('./block');
const { GENESIS_DATA } = require('./config');

describe('Block', () => {
    const timestamp='01/01/01';
    const data='new-data';
    const hash='newhash';
    const lastHash='lasthash';
    const newBlock=new Block({
        timestamp:timestamp,
        data:data,
        hash:hash,
        lastHash:lastHash,
    });
    it('find if fields present', () => {
        expect(newBlock.timestamp).toEqual(timestamp);
        expect(newBlock.data).toEqual(data);
        expect(newBlock.lastHash).toEqual(lastHash);
        expect(newBlock.hash).toEqual(hash);
    });
    describe('genesis block', () => {
        const genesisBlock=Block.genesis();
        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });
        it('returns genetic data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });
});