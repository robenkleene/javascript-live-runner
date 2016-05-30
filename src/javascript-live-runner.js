class LiveRunner {
  constructor(program) {
    this.program = program;
  }
  
  run(code) {
    console.log(code);
  }
}

var liveRunner = new LiveRunner();
export { liveRunner as default };
