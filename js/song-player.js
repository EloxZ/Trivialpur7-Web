class SongPlayer {
    DEFAULT_VOL = 0.5;

    constructor() {
        this.audio = null;
        this.status = 'paused';
        this.volume = this.DEFAULT_VOL;
    }
    
    loadSong(song) {
        if (this.audio) this.audio.pause();
        this.status = 'paused';
        this.audio = new Audio(song);
        this.audio.volume = this.volume;
        this.audio.loop = true;
        
        this.audio.addEventListener('error', () => {
            console.error(`Can't load song ${song}`);
            this.audio = null;
        });
    }
    
    pause() {
      if (this.audio && this.status === 'playing') {
        this.audio.pause();
        this.status = 'paused';
      }
    }
    
    play() {
      if (this.audio && this.status === 'paused') {
        this.audio.play();
        this.status = 'playing';
      }
    }
    
    changeVolume(volume) {
      this.volume = volume;
      this.audio.volume = volume;
    }
  }