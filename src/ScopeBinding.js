const bindings = new WeakMap();

class ScopeBinding {
	constructor(bindingId) { 
		const self = {
			id: bindingId,
			active: true
		}

		bindings.set(this, self);
	}

	get id() { return bindings.get(this).id }

	get isActive() { return bindings.get(this).active }

	revoke() { 
		const self = bindings.get(this);

		self.id = null;
		self.active = false;
	}
}

module.exports = ScopeBinding;
