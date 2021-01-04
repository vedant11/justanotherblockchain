const hexToBinary = require('hex-to-binary');
const Block = require('../block');
const { GENESIS_DATA, MINE_RATE } = require('../config');
const cryptoHash = require('../crypto-hash');

describe('Block', () => {
	const timestamp = Date.now();
	const data = 'new-data';
	const hash = 'newhash';
	const lastHash = 'lasthash';
	const nonce = 1;
	const difficulty = 2;
	const newBlock = new Block({
		timestamp: timestamp,
		data: data,
		hash: hash,
		lastHash: lastHash,
		nonce: nonce,
		difficulty: difficulty,
	});
	// Quieting console for this file
	let errorMock = jest.fn();
	let logMock = jest.fn();
	global.console.log = logMock;
	global.console.error = errorMock;
	it('find if fields present', () => {
		expect(newBlock.timestamp).toEqual(timestamp);
		expect(newBlock.data).toEqual(data);
		expect(newBlock.lastHash).toEqual(lastHash);
		expect(newBlock.hash).toEqual(hash);
		expect(newBlock.nonce).toEqual(nonce);
		expect(newBlock.difficulty).toEqual(difficulty);
	});
	describe('genesisBlock()', () => {
		const genesisBlock = Block.genesis();
		it('returns a Block instance', () => {
			expect(genesisBlock instanceof Block).toBe(true);
		});
		it('returns genetic data', () => {
			expect(genesisBlock).toEqual(GENESIS_DATA);
		});
	});
	describe('mineBlock()', () => {
		const lastBlock = Block.genesis();
		const data = 'mined-data';
		const minedBlock = Block.mineBlock({ lastBlock, data });
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
		it('creates sha-256 based on params', () => {
			expect(minedBlock.hash).toEqual(
				cryptoHash(
					minedBlock.timestamp,
					minedBlock.lastHash,
					minedBlock.data,
					minedBlock.nonce,
					minedBlock.difficulty
				)
			);
		});
		it('sets a `hash` that matches the difficulty', () => {
			expect(
				hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)
			).toEqual('0'.repeat(minedBlock.difficulty));
		});
	});
	describe('adjustDifficulty()', () => {
		it('raises difficulty for quickly mined block', () => {
			expect(
				Block.adjustDifficulty({
					originalBlock: newBlock,
					timestamp: Number(newBlock.timestamp) + MINE_RATE - 100,
				})
			).toEqual(newBlock.difficulty + 1);
		});
		it('lowers difficulty for slowly mined block', () => {
			expect(
				Block.adjustDifficulty({
					originalBlock: newBlock,
					timestamp: Number(newBlock.timestamp) + MINE_RATE + 100,
				})
			).toEqual(newBlock.difficulty - 1);
		});
		it('should not go less than 1', () => {
			newBlock.difficulty = -1;
			expect(
				Block.adjustDifficulty({
					originalBlock: newBlock,
					timestamp: 0,
				})
			).toEqual(1);
		});
	});
});
