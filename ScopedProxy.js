let Zone = require('zone.js');
let symbols = require('./symbols');

class ScopedProxy {
	constructor(scope, name, factory) {
		const handler = new Proxy({}, {
			get(target, trapName, receiver) {
				return function(proxy, ...args) {
					let bindings = Zone.current.get(symbols.scopeBindings) || {},
						bindingId = bindings[scope];

					if(!bindingId)  {
						//
					}
					 
					let instance = scope[symbols.getInstance](bindingId, name, factory); 

					return Reflect[trapName](instance, ..args);
				}
			}
		});

		return new Proxy(this, handler);
	}
}

module.exports = ScopedProxy;
