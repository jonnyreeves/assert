(function () {
    "use strict";
    
	// Custom error which will be thrown if an assertion fails.
	function AssertionError (msg) {
		this.name = "AssertionError";
		this.message = msg;
	}	
    
	AssertionError.prototype = new Error();

	function isArray(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	}

	// Asserts the supplied expression is true.
	function assert(expr, msg) {
		if (expr === false) {
			throw new AssertionError(msg || "Assertion failed");
		}
	}

    // Namespace used to aid minification.
    var a = assert;

	// Convenience for asserting that the supplied value is not undefined.
	a.isDefined = function (value, name) {
		assert(value !== void 0, (name || "value") + " is undefined");
	};

	// Convenience for asserting that the supplied value is an Array.
	a.isArray = function (value, name) {
		assert(isArray(value), (name || "value") + " is not an Array");
	};
    
    // Convenience for asserting that the supplied value is of a given type,
    // falls through to Javascript's native typeof keyword.
    a.isTypeof = function (value, name, expectedType) {
        
        // Allow name to be optional.
        if (expectedType === void 0) {
            expectedType = name;
            name = 'value';
        }
        
        assert(typeof value === expectedType, 
                name + " (" + value + ") is not of type " + expectedType);
    };

	// Assets that the supplied value contains all the keys supplied.
	a.containsKey = a.containsKeys = function(value, name, requiredKeys) {
		
		// Allow name to be optional.
		if (requiredKeys === void 0 && typeof name === 'object') {
			requiredKeys = name;
			name = "object";
		}

        // Allow a single key name, or space delimited method names.
        if (typeof requiredKeys === 'string') {
            requiredKeys = requiredKeys.split(" ");
        }

		// requiredKeys can be either an Array or another Object.
		var isArr = isArray(requiredKeys);
		
		for (var key in requiredKeys) {
			key = (isArr) ? requiredKeys[key] : key;
			assert(key in value, name + " is missing required key " + key);
		}
	};

    // Asserts that the supplied object exposes a list of methods.
    a.containsMethod = a.containsMethods = function(obj, name, requiredMethodNames) {
        
        // Allow name to be optional.
        if (requiredMethodNames === void 0) {
            requiredMethodNames = name;
            name = "object";
        }
        
        // Allow a single method name, or space delimited method names.
        if (!isArray(requiredMethodNames)) {
            requiredMethodNames = requiredMethodNames.toString().split(" ");
        }
        
        var len = requiredMethodNames.length;
        var methodName;
        for (var i = 0; i < len; i++) {
            methodName = requiredMethodNames[i];
            assert(methodName in obj && typeof obj[methodName] === 'function',
                    (name || "object") + " is missing required method " + 
                    methodName);
        }
    }

    // Builder which allows for the creation of fluent assertions on the 
    // supplied value.
	a.that = function(value, name) {
		return new AssertionBuilder(value, name);
	};

    // Provides a fluent interface for chaining assertions on the supplied value
	function AssertionBuilder (value, name) {
		this.value = value;
		this.name = name;
        
        this.containsKey = this.containsKeys;
        this.containsMethod = this.containsMethods;
	}
    
	AssertionBuilder.prototype = {
		isDefined: function () {
			a.isDefined(this.value, this.name);
			return this;
		},
		isArray: function () {
			a.isArray(this.value, this.name);
			return this;
		},
        isTypeof: function (expectedType) {
            a.isTypeof(this.value, this.name, expectedType);
            return this;
        },
		containsKeys: function (keys) {
			a.containsKeys(this.value, this.name, keys);
			return this;
		},
        containsMethods: function (requiredMethodNames) {
            a.containsMethod(this.value, this.name, requiredMethodNames);
            return this;
        }
	};

	// Export the AssertionError constructor.
	a.AssertionError = AssertionError;
    
    // Export to popular environments boilerplate.
    if (typeof define === 'function' && define.amd) {
		define(function () {
			return assert;
		});
	} 
	else if (typeof module !== 'undefined' && module.exports) {
		module.exports = assert;
	} 
	else {
		window['assert'] = assert;
	}
})();