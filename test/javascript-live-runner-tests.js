var expect = require("chai").expect;
var LiveRunner = require("../dist/javascript-live-runner.js");

// TODO: Figure out error handling, if input generates an error, do what?
// ideally we'd just return the error and half execution. But this is 
// it's hard to identify and error when just wrapping a REPL, because
// errors are just output without distinguishing characteristics from regular
// input.

var liveRunner = null;
describe("javascript-live-runner", function() {
  beforeEach(function () {
    liveRunner = new LiveRunner();
  });
  it('it can perform a simple calculation', function(done) {
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
  it('it allows printing the prompt', function(done) {
    var promptText = "> ";
    var code = 'console.log("' + promptText + '")';
    var testOutputs = [promptText, 'undefined'];
    liveRunner.on('output', function(input, output) {
      console.log("Output = " + output + "END");
      var testOutput = testOutputs.splice(0, 1)[0];
      expect(output).to.equal(testOutput);
      done();
    });
    liveRunner.read(code);
  });
  it('it calls the callback with an error', function(done) {
    var code = "asdf";
    liveRunner.on('output', function(input, output) {
      console.log('output =' + output);
      // expect(input).to.equal(code);
      done();
    });
    liveRunner.read(code);
  });
  // TODO: "it halts execution when an error is encountered."
});
