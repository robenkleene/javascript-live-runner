import vm from 'vm';
import events from 'events';

class LiveRunner extends events.EventEmitter {

  constructor() {
    super();
    this.input = '';
    this.output = '';
    let consoleOverride = {};
    consoleOverride.log = (value) => {
      this.output += value; 
    };
    var sandbox = {
      console: consoleOverride
    };
    this.context = vm.createContext(sandbox);
  }

  read(code) {
    const lastChar = code.substr(code.length - 1);
    if (lastChar == '\n') {
      // If the last character is a new line, slice it off because it will only
      // result in a blank line.
      code = code.slice(0, -1);
    }
    code.split('\n').forEach(function(line) {
      line += '\n';
      this.readLine(line);
    }, this);
  }

  readLine(code) {
    this.input += code;
    try {
      new Function(this.input);
      let result = vm.runInContext(code, this.context);
      this.emit('result', this.input, result, this.output);
      this.input = '';
      this.output = '';
    } catch (e) {
      this.emit('error', e);
      this.input = '';
    }
  }

  resolve() {
    try {
      let input = this.input;
      this.input = "";
      new Function(input);
    } catch (e) {
      this.emit('error', e);
    }
  }

}

export { LiveRunner as default };
