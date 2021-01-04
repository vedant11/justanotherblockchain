const cryptoHash = require('../blockchain_logic/crypto-hash');

describe('cryptoHash()', () => {
	it('generates sha-256', () => {
		expect(cryptoHash('foo')).toEqual(
			'2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
		);
	});

	it('produces same hash with any param order', () => {
		expect(cryptoHash('1', '2', '3')).toEqual(cryptoHash('2', '1', '3'));
	});
});
