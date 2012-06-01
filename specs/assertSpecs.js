describe("assert", function () {
    
    it("should throw an AssertionError if the expression evaluates to false", function () { 
        expect(function () {
            assert("jonny" === "sean")
        }).toThrow();
    });
    
    it("should not throw an AssertionError if the expression evaluated to true", function () { 
        expect(function () { 
            assert("jonny" === "jonny");
        }).not.toThrow();
    });
    
    it("should pass the supplied message to the AssertionError", function () { 
        var msg = "Custom message";
        expect(function () { 
            assert(1 === 2, msg);
        }).toThrow(msg);
    });
    
    describe("isDefined", function () { 
        it("should throw an AssertionError if the supplied value is undefined", function () { 
            expect(function () { 
                assert.isDefined(void 0);
            }).toThrow();
        });
        
        it("should not throw an AssertionError if the supplied value is defined", function () { 
            expect(function () { 
                assert.isDefined(0);
                assert.isDefined("");
            }).not.toThrow();
        });
        
        it("should not throw an AssertionError if the supplied value is null", function () { 
            expect(function () { 
                assert.isDefined(null);
            }).not.toThrow();
        });
        
        it("should provide a descriptive error message if a name value is supplied", function () {
            expect(function () { 
                assert.isDefined(void 0, "myValue")
            }).toThrow("myValue is undefined");
        });        
    });
    
    describe("isArray", function () { 
        it("should throw an AssertionError if the supplied value is not an Array", function () { 
            expect(function () { 
                assert.isArray({ });
            }).toThrow();
        });
        
        it("should not throw an AssertionError if the supplied value is an Array", function () { 
            expect(function () { 
                assert.isArray([]);
                assert.isArray(new Array());
            }).not.toThrow();
        });
        
        it("should provide a descriptive error message if a name value is supplied", function () {
            expect(function () { 
                assert.isArray(null, "myValue")
            }).toThrow("myValue is not an Array");
        });        
    });
    
    describe("isTypeof", function () { 
        it("should throw an AssertionError if the supplied value is not of the expected type", function () { 
            expect(function () { 
                assert.isTypeof(12, 'string')
            }).toThrow();
        });
        
        it("should not throw an AssertionError if the supplied value is of the expected type", function () { 
            expect(function () { 
                assert.isTypeof(12, 'number');
            }).not.toThrow();
        });
        
        it("should provide a descriptive error message if a name value is supplied", function () {
            expect(function () { 
                assert.isTypeof(12, 'myString', 'string')
            }).toThrow("myString (12) is not of type string");
        });        
    });    
    
    describe("containsKeys", function () { 
        
        var source;
        
        beforeEach(function () { 
            source = { 
                keyA: true,
                keyB: true,
                keyC: true
            };
        });
        
        it("should throw an AssertionError if the supplied value does not contain all of the supplied Array of keys", function () { 
            delete source['keyB'];
            
            expect(function () { 
                assert.containsKeys(source, [ 'keyA', 'keyB', 'keyC' ]);
            }).toThrow();
        });

        it("should not throw an AssertionError if the supplied value contains all of the supplied Array of keys", function () { 
            expect(function () { 
                assert.containsKeys(source, [ 'keyA', 'keyB', 'keyC' ]);
            }).not.toThrow();
        });
        
        it("should throw an AssertionError if the supplied value does not contain all of the supplied Object", function () { 
            
            var other = {
                keyA: "foo",
                required: "bar"
            };
            
            expect(function () { 
                assert.containsKeys(source, other);
            }).toThrow();
        });
        
        it("should throw an AssertionError if the supplied value contains all of the supplied Object", function () { 
            
            var other = {
                keyA: "foo",
                keyB: "bar",
                keyC: "baz"
            };
            
            expect(function () { 
                assert.containsKeys(source, other);
            }).not.toThrow();
        });  
        
        it("should provide a descriptive error message if a name value is supplied", function () {
            expect(function () { 
                assert.containsKeys(source, "myObj", [ 'bar' ])
            }).toThrow("myObj is missing required key bar");
        });
        
    });
    
    
    describe("that", function () { 
        
        it("should be chainable", function () { 
            var chain = assert.that("value");
            expect(chain.isDefined()).toEqual(chain);
        });
     });
});