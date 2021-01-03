const Block=require('./block')

describe('', () => {
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

});