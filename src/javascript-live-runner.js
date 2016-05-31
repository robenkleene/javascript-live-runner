// TODO: Replace these with ES6 style imports?
var spawn = require('child_process').spawn;
var events = require('events');

class LiveRunner extends events.EventEmitter {
  constructor(program) {
    super();
    this.input = "";
    console.log("progam = " + program);
    this.repl = spawn(program, ["-i"]);
    // this.repl = spawn("which", ["ruby"]);
    this.repl.stdin.setEncoding('utf-8');

    this.repl.stdout.on('data', (data) => {
      console.log("data = " + data);
      this.emit('output', this.input, data);
      this.input = "";
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
    console.log("this.repl.stdin = " + this.repl.stdin);
    console.log("code = " + code);
    this.repl.stdin.write(code);
  }

}

var liveRunner = new LiveRunner("node");
// var liveRunner = new LiveRunner("irb");
// var liveRunner = new LiveRunner("cat");
export { liveRunner as default };
