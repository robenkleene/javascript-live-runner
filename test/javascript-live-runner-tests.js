var expect = require("chai").expect;
var liveRunner = require("../dist/javascript-live-runner.js");

// TODO: Test that if input doesn't already have an ending of a "\n", than it
// gets added.

// TODO: Figure out error handling, if input generates an error, do what?

// TODO: Test that printing the actual prompt works, i.e., you should be able 
// to print `> ` and have it be valid output

describe("javascript-live-runner", function() {
  it('return something', function(done) {
    var code = "1 + 1";
    this.timeout(4000);
    liveRunner.on('output', function(input, output) {
      expect(output).to.equal("2");
      expect(input).to.equal(code + "\n");
      done();
    });
    liveRunner.read(code);
  });
});
