const { GENESIS_DATA, MINE_RATE } = require('./config');
const hexToBinary = require('hex-to-binary');
const cryptoHash = require('./crypto-hash');

class Block {
	constructor({ timestamp, lastHash, data, hash, nonce, difficulty }) {
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.data = data;
		this.nonce = nonce;
		this.difficulty = difficulty;
		this.hash = hash;
	}
	static genesis() {
		return new this(GENESIS_DATA);
	}
	static mineBlock({ lastBlock, data }) {
		let difficulty = lastBlock.difficulty;
		const { hash } = lastBlock;
		// const time_diff=Number(Date.now())-Number(lastBlock.timestamp);
		let newHash;
		let nonce = 0;
		let timestamp;
		do {
			timestamp = Date.now();
			difficulty = Block.adjustDifficulty({
				originalBlock: lastBlock,
				timestamp: timestamp,
			});
			// hash here is the lastHash
			newHash = cryptoHash(timestamp, hash, nonce, difficulty, data);
			nonce++;
		} while (
			hexToBinary(newHash).substring(0, difficulty) !==
			'0'.repeat(difficulty)
		);

		return new this({
			lastHash: hash,
			data,
			timestamp,
			nonce: --nonce,
			difficulty,
			hash: newHash,
		});
	}
	static hashIsValid(block) {
		const { timestamp, lastHash, nonce, difficulty, data } = block;
		return (
			block.hash ===
			cryptoHash(timestamp, lastHash, nonce, difficulty, data)
		);
	}
	// returns suitable difficulty level
	static adjustDifficulty({ originalBlock, timestamp }) {
		if (originalBlock.difficulty < 1) {
			console.log('difficulty was negative');
			return 1;
		}
		const diff = timestamp - Number(originalBlock.timestamp);
		if (diff > MINE_RATE && originalBlock.difficulty > 1) {
			console.log('decreasing difficulty');
			return originalBlock.difficulty - 1;
		}
		console.log('increasing difficulty');
		return originalBlock.difficulty + 1;
	}
}

module.exports = Block;
