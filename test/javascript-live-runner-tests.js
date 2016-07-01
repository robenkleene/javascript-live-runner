var expect = require("chai").expect;
var LiveRunner = require("../dist/javascript-live-runner.js");

// TODO: Test that if input already ends with "\n", than it
// doesn't get added.

// TODO: Figure out error handling, if input generates an error, do what?

// TODO: Test that printing the actual prompt works, i.e., you should be able 
// to print `> ` and have it be valid output

var liveRunner = null;
describe("javascript-live-runner", function() {
  beforeEach(function () {
    liveRunner = new LiveRunner();
  });
  it('performs a simple calculation', function(done) {
    var code = "1 + 1";
    liveRunner.on('output', function(input, output) {
      expect(output).to.equal("2");
      expect(input).to.equal(code + "\n");
      done();
    });
    liveRunner.read(code);
  });
  it('it only adds a line break if one isn\'t present', function(done) {
    var code = "1 + 1\n";
    liveRunner.on('output', function(input, output) {
      expect(input).to.equal(code);
      done();
    });
    liveRunner.read(code);
  });
});
