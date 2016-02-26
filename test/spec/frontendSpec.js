let mainJS = require("../../frontend/js/main.js");

describe("Frontend", function() {
    it("should not be speaking nonsense", function() {
        expect(true).toBe(true);
    });
    it("should export the function properly", function() {
        expect(mainJS).not.toBe(undefined);
    });
    describe("Main JS Exported Function", function() {
        it("should produce a correct result basically", function() {
            expect(mainJS("bob")).toBe("bob says hello");
        });
        it("should correctly concatenate numbers and strings", function() {
            expect(mainJS(1)).toBe("1 says hello");
        });
    });
});
