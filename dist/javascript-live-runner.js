'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LiveRunner = function (_events$EventEmitter) {
  _inherits(LiveRunner, _events$EventEmitter);

  function LiveRunner() {
    _classCallCheck(this, LiveRunner);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LiveRunner).call(this));

    _this.input = '';
    _this.output = '';
    var consoleOverride = {};
    consoleOverride.log = function (value) {
      _this.output += value;
    };
    var sandbox = {
      require: require,
      console: consoleOverride
    };
    _this.context = _vm2.default.createContext(sandbox);
    return _this;
  }

  _createClass(LiveRunner, [{
    key: 'read',
    value: function read(code) {
      var lastChar = code.substr(code.length - 1);
      if (lastChar == '\n') {
        // If the last character is a new line, slice it off because it will only
        // result in a blank line.
        code = code.slice(0, -1);
      }
      code.split('\n').forEach(function (line) {
        line += '\n';
        this.readLine(line);
      }, this);
    }
  }, {
    key: 'readLine',
    value: function readLine(code) {
      this.input += code;
      try {
        var result = _vm2.default.runInContext(this.input, this.context);
        var input = this.input;
        this.input = '';
        this.emit('result', input, result, this.output);
        this.output = '';
      } catch (e) {
        // Deliberately ignored
      }
    }
  }, {
    key: 'resolve',
    value: function resolve() {
      try {
        var input = this.input;
        this.input = '';
        var result = _vm2.default.runInContext(input, this.context);
      } catch (e) {
        this.emit('error', e);
      }
    }
  }]);

  return LiveRunner;
}(_events2.default.EventEmitter);

exports.default = LiveRunner;
module.exports = exports['default'];