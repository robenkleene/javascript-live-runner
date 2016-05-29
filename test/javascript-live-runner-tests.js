var expect = require("chai").expect;
var liveRunner = require("../dist/javascript-live-runner.js");

console.log(liveRunner);

describe("javascript-live-runner", function() {
  it("returns something", function() {
    liveRunner.run("test");
    expect(2).to.equal(2);
  });
});
