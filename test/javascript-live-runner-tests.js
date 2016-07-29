var expect = require("chai").expect;
var LiveRunner = require("../dist/javascript-live-runner-vm.js");

// TODO: Figure out error handling, if input generates an error, do what?
// ideally we'd just return the error and half execution. But this is 
// it's hard to identify and error when just wrapping a REPL, because
// errors are just output without distinguishing characteristics from regular
// input.

// TODO: Create input that's malformed JavaScript

// TODO: Test that when sending input, and then sending input again, that the 
// existing state is preserved.

// TODO: Test `resolve()` function

var liveRunner = null;
describe("javascript-live-runner", function() {
  beforeEach(function () {
    liveRunner = new LiveRunner();
  });
  it('it can perform a simple calculation', function(done) {
    var code = '1 + 1';
    liveRunner.on('result', function(input, result) {
      expect(result).to.equal(2);
      expect(input).to.equal(code + "\n");
      done();
    });
    liveRunner.read(code);
  });
  it('it only adds a line break if one isn\'t present', function(done) {
    var code = "1 + 1\n";
    liveRunner.on('result', function(input, result) {
      expect(input).to.equal(code);
      done();
    });
    liveRunner.read(code);
  });
  it.only('it allows printing', function(done) {
    var text = "> ";
    var code = 'console.log("' + text + '")';
    // var code = 'console';
    liveRunner.on('result', function(input, result, output) {
      expect(output).to.equal(text);
      done();
    });
    liveRunner.read(code);
  });
  it('it outputs undefined when defining a variable', function(done) {
    var text = "var test = 2 + 2;";
    liveRunner.on('result', function(input, result) {
      expect(result).to.equal(text);
      done();
    });
    liveRunner.read(code);
  });
  it('it calls the callback with an error', function(done) {
    var code = "asdf";
    liveRunner.on('result', function(input, result) {
      console.log('result =' + result);
      // expect(input).to.equal(code);
      done();
    });
    liveRunner.read(code);
  });
  // TODO: "it halts execution when an error is encountered."
});
