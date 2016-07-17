import vm from "vm";
import events from "events";

class LiveRunner extends events.EventEmitter {

  constructor(program = "node") {
    super();
    var sandbox = {
      console: console
    };
    this.input = "";
    this.context = vm.createContext(sandbox);
    // this.context = vm.createContext();
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
      let output = vm.runInContext(code, this.context);
      this.input = '';
      this.emit('result', this.input, output);
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
