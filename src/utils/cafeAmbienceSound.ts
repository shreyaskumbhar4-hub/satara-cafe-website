class CafeSoundSynthesizer {
  private audioCtx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const bufferSize = this.audioCtx.sampleRate * 2;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate soft pink/brown noise (resembling gentle rain / distant cafe murmur / slow boiling kettle)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noiseSource = this.audioCtx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Filter: warm low-pass for comforting rustic tone
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 450;

      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 1.5);

      noiseSource.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      noiseSource.start();
      this.noiseNode = noiseSource;
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop(): void {
    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioCtx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.5);
        setTimeout(() => {
          if (this.noiseNode && 'stop' in this.noiseNode) {
            (this.noiseNode as AudioBufferSourceNode).stop();
          }
          this.noiseNode = null;
        }, 550);
      } catch {
        // Safe fallback
      }
    }
    this.isPlaying = false;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const cafeSound = new CafeSoundSynthesizer();
