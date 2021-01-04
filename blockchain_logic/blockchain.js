const Block = require('./block');

class Blockchain {
	constructor() {
		// Array of `Block`s
		this.chain = [];

		const genesisBlock = Block.genesis();
		this.chain.push(genesisBlock);
	}
	addBlock({ data }) {
		const newBlock = Block.mineBlock({
			lastBlock: this.chain[this.chain.length - 1],
			data,
		});
		this.chain.push(newBlock);
	}

	replaceChain(newChain) {
		if (this.chain.length >= newChain.chain.length) {
			console.error(`length isn't valid for replacement `);
			return;
		}
		if (!Blockchain.isValidBlockchain(newChain)) {
			console.error(`new chain is invalid`);
			return;
		}
		console.log('replacing chain');
		this.chain = newChain;
		return;
	}

	static isValidBlockchain(blockchain) {
		const blocks = blockchain.chain;
		// checking if genesis block is valid
		// Using JSON stingify to avoid instance ref comparision
		if (JSON.stringify(blocks[0]) !== JSON.stringify(Block.genesis()))
			return false;
		let lastHash = blocks[0].hash;
		let lastDifficulty = blocks[0].difficulty;
		blocks.shift(); // deletes first elem
		for (let index = 0; index < blocks.length; index++) {
			const block = blocks[index];
			if (block.lastHash !== lastHash) return false;
			lastHash = block.hash;
			if (Block.hashIsValid(block) === false) return false;
			// to prevent large jumps in difficulty levels
			if (Math.abs(block.difficulty - lastDifficulty) > 1) return false;
			lastDifficulty = block.difficulty;
		}
		return true;
	}
}

module.exports = Blockchain;
