assert
======
Tiny assertion framework for JavaScript.  Provides an reliable way of ensuring
that arguments are valid so you can halt execution early to aid debugging.


### usage
Assertions can be made using the following assertion functions, if any of the
expressions evaluate to false an AssertionError will be thrown.

```js
assert(expr, msg);
assert.isDefined(value, [valueName]);
assert.isArray(value, [valueName]);
assert.isTypeof(value, [valueName], expectedType)
assert.containsKeys(value, [valueName], expectedKeys);
assert.containsMethods(value, [valueName], expectedMethodNames);
```

There's also a fluent interface for chaining assertions on a given value:

```js
assert.that(value, valueName)
    .isTypeof('number');
```

Check the included (Jasmine Specs)[./specs] for more usage examples.