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

  // Should add a line break at the end
  read(code) {
    const lastChar = code.substr(code.length - 1);
    if (lastChar != "\n") {
      code += "\n";
    }
    this.readLine(code);
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
