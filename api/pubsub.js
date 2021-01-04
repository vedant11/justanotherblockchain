const redis = require('redis');

const CHANNELS = {
	TEST: 'TEST',
	BLOCKCHAIN: 'BLOCKCHAIN',
};

class PubSub {
	constructor({ blockchain }) {
		this.blockchain = blockchain;
		this.pub = redis.createClient();
		this.sub = redis.createClient();

		this.subscribeAll();

		this.sub.on('message', (channel, message) =>
			this.handleMessage(channel, message)
		);
	}

	handleMessage(channel, message) {
		const parsedMessage = JSON.parse(message);
		console.log('received a message', parsedMessage);

		if (channel === CHANNELS.BLOCKCHAIN)
			this.blockchain.replaceChain(parsedMessage);
	}

	subscribeAll() {
		Object.values(CHANNELS).forEach((channel) => {
			this.sub.subscribe(channel);
		});
	}

	publish({ channel, message }) {
		// to prevent listening to its own publishes
		this.sub.unsubscribe(channel, () => {
			this.pub.publish(channel, message, () => {
				this.sub.subscribe(channel);
			});
		});
	}

	broadcastBlockchain() {
		this.publish({
			channel: CHANNELS.BLOCKCHAIN,
			message: JSON.stringify(this.blockchain),
		});
	}
}
module.exports = PubSub;
