registerProcessor('buffer-detector', class extends AudioWorkletProcessor {
  process (inputs, outputs, parameters) {
    if (this.#socket === null) {
      return false;
    }

    if (this.#isRecording === true) {
      const [input] = inputs;
      const buffer = new ArrayBuffer(input.length * 2);
      const output = new DataView(buffer);

      for (let i = 0, offset = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }

      this.#socket.send(buffer);
    }

    return true;
  }

  static get parameterDescriptors() {
    return [{
      name: 'Buffer Detector',
    }]
  }

  #socket = null;
  #isRecording = false;

  constructor() {
    super();
  }

  get socket() {
    return this.#socket;
  }

  set socket(value) {
    if (value instanceof WebSocket) {
      this.#socket = value;
    }
  }

  get recording() {
    return this.#isRecording;
  }

  set recording(value) {
    if ('boolean' === typeof value) {
      this.#isRecording = value;
    }
  }
});