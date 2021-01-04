const MINE_RATE = 1000;
const GENESIS_DATA = {
	// timestamp should be hardcoded to maintain genesis check
	timestamp: 191817,
	lastHash: '____',
	hash: 'hash1',
	data: 'data',
	nonce: 0,
	difficulty: 3,
};

module.exports = { GENESIS_DATA, MINE_RATE };
