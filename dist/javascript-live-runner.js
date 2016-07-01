"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _child_process = require("child_process");

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LiveRunner = function (_events$EventEmitter) {
  _inherits(LiveRunner, _events$EventEmitter);

  function LiveRunner(program) {
    _classCallCheck(this, LiveRunner);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LiveRunner).call(this));

    _this.input = "";
    _this.repl = (0, _child_process.spawn)(program, ["-i"]);
    _this.repl.stdin.setEncoding('utf-8');

    _this.repl.stdout.on('data', function (data) {
      // Don't pass through the prompt
      if (data != "> ") {
        var output = data.slice(0, -1).toString('utf8');
        _this.emit('output', _this.input, output);
        _this.input = "";
      }
    });

    _this.repl.stderr.on('data', function (data) {
      console.log(data);
    });

    _this.repl.on('close', function (code) {
      console.log("child process exited with code " + code);
    });
    _this.repl.on('error', function (err) {
      console.log('Error: ' + err);
    });
    return _this;
  }

  // Should add a line break at the end


  _createClass(LiveRunner, [{
    key: "read",
    value: function read(code) {
      var lastChar = code.substr(code.length - 1);
      if (lastChar != "\n") {
        code += "\n";
      }
      this.readLine(code);
    }

    // Should leave the code as is (not add line breaks), as if reading a file
    // line by line

  }, {
    key: "readLine",
    value: function readLine(code) {
      this.input += code;
      this.repl.stdin.write(code);
    }
  }]);

  return LiveRunner;
}(_events2.default.EventEmitter);

var liveRunner = new LiveRunner("node");
exports.default = liveRunner;
module.exports = exports["default"];