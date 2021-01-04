const crypto = require('crypto');

const cryptoHash = (...inputs) => {
	// Any order of inputs is valid
	const hash = crypto.createHash('sha256');
	hash.update(inputs.sort().join('-'));
	const hashValue = hash.digest('hex');
	return hashValue;
};

module.exports = cryptoHash;
