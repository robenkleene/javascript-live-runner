var expect = require('chai').expect;
var LiveRunner = require('../dist/javascript-live-runner.js');

// TODO: Figure out error handling, if input generates an error, do what?
// ideally we'd just return the error and half execution. But this is 
// it's hard to identify and error when just wrapping a REPL, because
// errors are just output without distinguishing characteristics from regular
// input.

// TODO: Create input that's malformed JavaScript

// TODO: Test that when sending input, and then sending input again, that the 
// existing state is preserved.

// TODO: Test `resolve()` function

// TODO: Figure out a solution for multiple valid statements on one line, e.g.,
// what if a program contains the following on one line:
// `var test = 1 + 1; test++; for (i = 0; i < 5; i++) {  test += i; } test * 2;`
// It should probably evaluate that as one line and return one value.

// TODO: Handle input that contains a new line character in a string, e.g.,:
// `var test = "Hello\nWorld\n";

// TODO: "it halts execution when an error is encountered."
// This means it doesn't try to process subsequent lines.

// TODO: Test that a multi-line program with line endings removed behaves as 
// expected.

var liveRunner = null;
describe('javascript-live-runner', function() {

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

  it('it adds a line break if one isn\'t present', function(done) {
    var code = '1 + 1';
    liveRunner.on('result', function(input, result) {
      expect(input).to.equal(code + '\n');
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

  it('it allows printing', function(done) {
    var text = '> ';
    var code = 'console.log("' + text + '")';
    // var code = 'console';
    liveRunner.on('result', function(input, result, output) {
      expect(output).to.equal(text);
      done();
    });
    liveRunner.read(code);
  });

  it('it outputs undefined when defining a variable', function(done) {
    var code = 'var test = 2 + 2;';
    liveRunner.on('result', function(input, result) {
      expect(result).to.equal(undefined);
      done();
    });
    liveRunner.read(code);
  });

  it('it calls the callback with an error', function(done) {
    var code = 'asdf';
    liveRunner.on('error', function(e) {
      expect(e.name).to.equal('ReferenceError');
      done();
    });
    liveRunner.read(code);
    liveRunner.resolve();
  });

  it('it fires a callback for each valid statement', function(done) {
    var inputs = ['var test = 1 + 1;\n',
    'test++;\n',
    'for (var i = 0; i < 5; i++) {\n' +
    '  test += i;\n' +
    '}\n',
    'test * 2;\n'];
    var code = inputs.join('');
    var testResults = [undefined, 2, 13, 26];
    liveRunner.on('result', function(input, result) {
      var testInput = inputs.splice(0, 1)[0];
      var testResult = testResults.splice(0, 1)[0];
      expect(result).to.equal(testResult);
      if (testResults.length === 0) {
        done();
      }
    });
    liveRunner.read(code);
  });

  it('it can import a core module', function(done) {
    var code = 'var assert = require(\'assert\');\n' +
      'assert(true);';
    var testResults = [undefined, undefined];
    liveRunner.on('result', function(input, result) {
      var testResult = testResults.splice(0, 1)[0];
      expect(result).to.equal(testResult);
      if (testResults.length === 0) {
        done();
      }
    });
    liveRunner.read(code);
  });

  it('it can import a local module', function(done) {
    var storedDone = done;
    var code = 'var expect = require(\'chai\').expect;\n' +
      'expect(2).to.equal(2);';
    var undefinedComparison = function(lhs) {
      expect(lhs).to.equal(undefined);
    };
    var objectComparison = function(lhs) {
      var testResult = expect(2).to.equal(2);
      expect(lhs.constructor).to.equal(testResult.constructor);
    };
    var testComparisons = [undefinedComparison, objectComparison];
    liveRunner.on('result', function(input, result) {
      try {
        var testComparison = testComparisons.splice(0, 1)[0];
        testComparison(result);
        if (testComparisons.length === 0 && !!storedDone) {
          storedDone();
        }
      }
      catch(e) {
        storedDone = null;
        done(e);
      }
    });
    liveRunner.read(code);
  });

});
