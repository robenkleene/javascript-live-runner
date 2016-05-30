var expect = require("chai").expect;
var liveRunner = require("../dist/javascript-live-runner.js");

// TODO: Test that if it doesn't already have an ending of a "\n", that it adds
// one

// TODO: Figure out error handling, if input generates an error, do what?

describe("javascript-live-runner", function() {
  it('return something', function(done) {
    var code = "1 + 1";
    liveRunner.on('output', function(input, output) {
      expect(output).to.equal(2);
      expect(input).to.equal(input + "\n");
      done();
    });
    liveRunner.read(code);
  });
});
