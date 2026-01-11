
/**
 * Spectral Audio Engine for Ghost Spectre Clicker
 * Generates procedural sounds using the Web Audio API
 */

class SpectralSoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    this.isMuted = localStorage.getItem('gs_muted') === 'true';
  }

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('gs_muted', muted.toString());
  }

  getMuted() {
    return this.isMuted;
  }

  // A quick "ping" for tapping the ghost
  playTap() {
    if (this.isMuted) return;
    this.initCtx();
    const ctx = this.ctx!;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    // Add slight randomness to pitch
    osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  // A rising swell for activating boost
  playBoost() {
    if (this.isMuted) return;
    this.initCtx();
    const ctx = this.ctx!;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.5);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.5);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.0);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1.0);
  }

  // A hauntingly beautiful chord for milestones
  playMilestone() {
    if (this.isMuted) return;
    this.initCtx();
    const ctx = this.ctx!;
    
    const frequencies = [261.63, 311.13, 392.00, 493.88]; // CmMaj7 spectral chord
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.2 + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    });
  }
}

export const soundManager = new SpectralSoundManager();
