var expect = require("chai").expect;
var LiveRunner = require("../dist/javascript-live-runner.js");

// TODO: Figure out error handling, if input generates an error, do what?

var liveRunner = null;
describe("javascript-live-runner", function() {
  beforeEach(function () {
    liveRunner = new LiveRunner();
  });
  it('performs a simple calculation', function(done) {
    var code = '1 + 1';
    liveRunner.on('output', function(input, output) {
      expect(output).to.equal('2');
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
  it('It allows printing the prompt', function(done) {
    var promptText = "> ";
    var code = 'console.log("' + promptText + '")';
    liveRunner.on('output', function(input, output) {
      expect(output).to.equal(promptText);
      done();
    });
    liveRunner.read(code);
  });
});
