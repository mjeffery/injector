let symbols = require('./symbols')

class InstanceScope {
	[symbols.getInstance](bindingId, name, factory) {
		return factory();
	}
}

module.exports = InstanceScope;
