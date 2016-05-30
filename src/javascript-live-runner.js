class LiveRunner {
  constructor(program) {
    this.program = program;
  }
  
  read(code) {
    console.log(code);
  }
}

var liveRunner = new LiveRunner("node");
export { liveRunner as default };
