window.clg = window.clg || {};
window.clg.injector = window.clg.injector || {};

(function(ns) {
  var singletons = {};
  
  ns.factory = function(name, injectable) {
    validateInjectable(injectable);
    
    singletons[name] = {
      factory: injectable,
      built: false,
      instance: undefined
    }
  }
  
  ns.inject = function( injectable ) {
    validateInjectable(injectable);
    
    return inject(injectable, []);
  }
  
  ns.injectable = function( injectable ) {
    validateInjectable( injectable );
    
    var deferred = function() {
      return ns.inject( injectable );
    }
    deferred.__INJECTABLE__ = true;
    
    return deferred;
  }
  
  ns.value = function( value ) {
    return isFunction(value) && value.__INJECTABLE__ === true ? value() : value;
  }
  
  function inject(injectable, instantiationStack) {
    if( isFunction( injectable ) ) {
      return injectable.call(this);
    }
    else {
      var deps = injectable.slice(0, -1),
          factory = injectable[injectable.length - 1],
          args = deps.map(function(name) {
            return resolveDependency(name, instantiationStack);
          });
      
      return factory.apply(this, args);
    }
  }
  
  function resolveDependency(name, instantiationStack) {
    var index  = instantiationStack.indexOf(name);
    if(index >= 0) {
      var chain = instantiationStack.slice(index).join(' -> ') + ' -> ' + name;
          
      throw new Error('circular dependency found: ' + chain);  
    }
    
    var singleton = singletons[name];
    if(!singleton) throw new Error('The dependency "' + name + '" has not been defined!')
    
    var instance = singleton.instance;
    if(!singleton.built) {
      instantiationStack.push(name);
      instance = singleton.instance = inject(singleton.factory, instantiationStack);
      instantiationStack.pop();
      
      singleton.built = true;
    }
    
    return instance;
  }
  
  function validateInjectable( value ) {
    if( !isFunction(value) ) {
      if( !Array.isArray(value) ) throw new Error('injectable values must be a function or an array!');
      if( value.length < 1 || !isFunction(value[value.length - 1]) )  throw new Error('last element of injectable array must be a function!');
    }
  }
  
  function isFunction( value ) {
    return !!value && typeof value === 'function'
  }
  
})(window.clg.injector);