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
    describe('genesisBlock()', () => {
        const genesisBlock=Block.genesis();
        console.log('gensisBlock is', genesisBlock);
        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });
        it('returns genetic data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });
    describe('mineBlock()', () => {
        const lastBlock=Block.genesis();
        const data='mined-data';
        const minedBlock=Block.mineBlock({lastBlock,data});
        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });
        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);            
        });
        it('sets the `data` ', () => {
            expect(minedBlock.data).toEqual(data);
        });
        it('sets the `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });
    });
});