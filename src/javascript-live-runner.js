// TODO: Replace these with ES6 style imports?
var spawn = require('child_process').spawn;
var events = require('events');

class LiveRunner extends events.EventEmitter {
  constructor(program) {
    super();
    this.input = "";
    this.repl = spawn(program);

    this.repl.stdout.on('data', (data) => {
      this.emit('data', this.input, data);
      this.input = "";
    });

    this.repl.stderr.on('data', (data) => {
      console.log(data);
    });
  }

  // Should add a line break at the end
  read(code) {
    const lastChar = code.substr(code.length - 1);
    if (lastChar != "\n") {
      code += "\n";
    }
    this.readLine(code);
  }
  
  // Should leave the code as is (not add line breaks), as if reading a file 
  // line by line
  readLine(code) {
    this.input += code;
    this.repl.stdin.write(code);
  }

}

var liveRunner = new LiveRunner("node");
export { liveRunner as default };
