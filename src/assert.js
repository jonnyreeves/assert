(function () {
    "use strict";
    
	// Custom error which will be thrown if an assertion fails.
	function AssertionError (msg) {
		this.name = "AssertionError";
		this.message = msg;
	}	
    
	AssertionError.prototype = new Error();

	// Provides a fluent interface for chaining assertions on the supplied value.
	function AssertionBuilder (value, name) {
		this.value = value;
		this.name = name;
	}
    
	AssertionBuilder.prototype = {
		isDefined: function () {
			assert.isDefined(this.value, this.name);
			return this;
		},
		isArray: function () {
			assert.isArray(this.value, this.name);
			return this;
		},
        isTypeof: function (expectedType) {
            assert.isTypeof(this.value, this.name, expectedType);
            return this;
        },
		containsKeys: function (keys) {
			assert.containsKeys(this.value, this.name, keys);
			return this;
		}
	};

	function isArray(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	}

	// Asserts the supplied expression is true.
	function assert(expr, msg) {
		if (expr === false) {
			throw new AssertionError(msg || "Assertion failed");
		}
	}

	// Builder which allows for the creation of fluent assertions on the supplied value.
	assert.that = function(value, name) {
		return new AssertionBuilder(value, name);
	};

	// Convenience for asserting that the supplied value is not undefined.
	assert.isDefined = function (value, name) {
		assert(value !== void 0, (name || "value") + " is undefined");
	};

	// Convenience for asserting that the supplied value is an Array.
	assert.isArray = function (value, name) {
		assert(isArray(value), (name || "value") + " is not an Array");
	};
    
    assert.isTypeof = function (value, name, expectedType) {
        
        // Allow name to be optional.
        if (expectedType === void 0) {
            expectedType = name;
            name = 'value';
        }
        
        assert(typeof value === expectedType, name + " (" + value + ") is not of type " + expectedType);
    };

	// Assets that the supplied value contains all the keys supplied.
	assert.containsKeys = function(value, name, requiredKeys) {
		
		// Allow name to be optional.
		if (requiredKeys === void 0 && typeof name === 'object') {
			requiredKeys = name;
			name = "object";
		}

		// requiredKeys can be either an Array or another Object.
		var isArr = isArray(requiredKeys);
		
		for (var key in requiredKeys) {
			key = (isArr) ? requiredKeys[key] : key;
			assert(key in value, name + " is missing required key " + key);
		}
	};

	// Export the AssertionError constructor.
	assert.AssertionError = AssertionError;
    
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