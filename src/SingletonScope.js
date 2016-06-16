let symbols = require('./symbols');

class SingletonScope {

	constructor() {
		this._store = {};
	}

	[symbols.getInstance](bindingId, name, factory) {
		let store = this._store,
			entry = store[name];

		if(!entry) entry = store[name] = { instance: factory };

		return entry.instance;
	}
}

module.exports = SingletonScope;
