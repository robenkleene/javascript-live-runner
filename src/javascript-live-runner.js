// TODO: Replace these with ES6 style imports?
var spawn = require('child_process').spawn;
var events = require('events');

class LiveRunner extends events.EventEmitter {
  constructor(program) {
    super();
    this.input = "";
    this.repl = spawn(program, ["-i"]);
    this.repl.stdin.setEncoding('utf-8');

    this.repl.stdout.on('data', (data) => {
      // Don't pass through the prompt
      if (data != "> ") {
        const output = data.slice(0, -1).toString('utf8');
        this.emit('output', this.input, output);
        this.input = "";
      }
    });

    this.repl.stderr.on('data', (data) => {
      console.log(data);
    });
    
    this.repl.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    this.repl.on('error', function(err) {
      console.log('Error: ' + err);
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
