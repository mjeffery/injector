let Zone = require('zone.js');
let injector = require('./injector');

let _currentScopes = new Scopes(Zone.current);

function Scopes(zone) { 
	this._zone = zone || new Zone(null, null); 
}

Object.defineProperty(Scopes, current, {
	get: () => _currentScopes,
	enumerable: true,
	configurable: true
});

Scopes.prototype.bind = function( bindings ) {
	let properties = {};
	for([host, scopeName] of bindings) { 		
		//TODO get a conversation id for host object
		properties[scopeName] = null;
	};

	return new Scopes( this._zone.fork({ properties }) );
};

Scopes.prototype.unbind = function( bindings ) {
	
	return new Scopes( this._zone.fork({  }) );
}

//TODO is this a good idea even?
Scopes.prototype.wrap = function( callback ) {
	if( typeof callback !== 'function' )
		throw new Error('Expecting function, got: ' + callback);

	let scopes = this;
	return function() {
		scopes.run( callback );
	}
}

Scopes.prototype.run = function( callback, applyThis, applyArgs ) {
	if( applyThis === void 0 ) { applyThis = null; }
	if( applyArgs === void 0 ) { applyArgs = null; }

	let oldScopes = _currentScopes;
	_currentScopes = this;
	try {
		this._zone.run( () => callback.apply(applyThis, applyArgs) );
	}
	finally {
		_currentScopes = oldScopes;
	}
}

module.exports = Scopes;
