let symbols = require('./symbols');

class Scope {
	constructor(name) {
		this._name = name;
		this._hostBindings = new WeakMap();
		this._nextHostId = 0;
	}

	[symbols.getInstance](bindingId, name, factory) {
		let hostBindings = this._hostBindings,
			host = hostBindings.get(bindingId);

		if(!host) throw new Error(`Scope "${this._name}" does not exist in the current context`);

		let store = host[symbols.instanceStore];
		if(!store) store = host[symbols.instanceStore] = {};

		let entry = store[name];
		if(!entry) entry = store[name] = { instance: factory() };

		return entry.instance;
	}

	[symbols.bindScope](host) {
		let hosts = this._hostBindings,
			id = this._name + '-' + this._nextHostId++,
			key = { id };

		hosts.set(key, host);

		return key;
	}
}

module.exports = Scope;
