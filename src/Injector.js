let symbols = require('./symbols')
let SingletonScope = require('./SingletonScope');
let InstanceScope = require('./InstanceScope');

class Injector {
	
	constructor() {
		this._registry = new Map();
		this._scopes = new Map()
			.set('singleton', new SingletonScope())
			.set('instance', new InstanceScope());
		this._defaultScope = 'singleton';
	}

	factory() {
		let name = arguments[0],
			config, injectable;

		if( arguments.length >= 3) {
			config = arguments[1];
			injectable = arguments[2];
		}
		else {
			injectable = arguments[1];
		}

		return this.__factory(name, config, injectable);
	}

	__factory(name, config, injectable) {
		validateInjectable(injectable);

		let registry = this._registry,
			configCopy = Object.assign({}, config),
			entry = {
				config: configCopy,
				factory: this.defer(configCopy, injectable),
				// built: false,       // these come from the scope now...
				// instance: undefined
			};

		registry.set(name, entry);
	}

	inject() {
		
	}

	__inject(config, injectable, instantiationStack) {
		
	}



}
