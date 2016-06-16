const Zone = require('zone.js');

const symbols = require('./symbols');
const ScopeBinding = require('./ScopeBinding');


const isActiveBinding = b => b instanceof ScopeBinding && b.isActive;

class ScopedProxy {
	constructor(scope, name, factory) {
		const handler = new Proxy({}, {
			get(target, trapName, receiver) {
				return function(proxy, ...args) {
					let bindings = Zone.current.get(symbols.scopeBindings) || {},
						binding = bindings[scope];

					if( !isActiveBinding(binding) )
						throw Error('')
					 
					let instance = scope[symbols.getInstance](binding.id, name, factory); 

					return Reflect[trapName](instance, ..args);
				}
			}
		});

		return new Proxy(this, handler);
	}
}

module.exports = ScopedProxy;
