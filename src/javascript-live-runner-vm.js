import vm from "vm";

class LiveRunner extends events.EventEmitter {
  constructor(program = "node") {
      super();
      this.input = "";
      this.context = vm.createContext();
    }

  // this.emit('output', this.input, output);

  // Should add a line break at the end
  read(code) {
    this.input += code;
    let result = vm.runInContext(code, this.context);
  }

}

export { LiveRunner as default };
