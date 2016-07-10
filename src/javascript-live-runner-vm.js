class LiveRunner extends events.EventEmitter {

  // this.emit('output', this.input, output);

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

export { LiveRunner as default };
