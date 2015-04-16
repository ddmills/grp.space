whale.Service('grp.Stream.youtube', ['grp.Streams'], {
  DEFAULT_WIDTH: 640,
  DEFAULT_HEIGHT: 360,
  construct: function(Streams) {
    this.api = null;
    Streams.registerStream(this);
  },
  canHandle: function(type) {
    return type == 'youtube';
  },
  play: function() {
    this.api.playVideo();
  },
  pause: function() {
    this.api.pauseVideo();
  },
  load: function(url) {
    this.api.loadVideoById(url);
  },
  getOffset: function() {
    return this.api.getCurrentTime();
  },
  setOffset: function(offset) {
    this.api.seekTo(offset, true);
  },
  getVolume: function() {
    return this.api.getVolume() / 100;
  },
  setVolume: function(volume) {
    this.api.setVolume(volume * 100);
  },
  mute: function() {
    this.api.mute();
  },
  unMute: function() {
    this.api.unMute();
  },
  isMuted: function() {
    return this.api.isMuted();
  },
  duration: function() {
    return this.api.getDuration();
  },
  show: function() {
    this.api.setSize(this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
  },
  hide: function() {
    this.api.setSize(0, 0);
  },
  _doReady: function() {
    this.api = new YT.Player('youtube-player', {
      height: '0',
      width: '0',
      playerVars: {
        'controls': 0,
        'showinfo': 0
      }
    });
    this.api.addEventListener('onStateChange', this._handleStateChange.bind(this));
    this.trigger('READY');
  },
  _handleStateChange: function(e) {
    switch (e.data) {
    case YT.PlayerState.ENDED:
      this.trigger('ENDED');
      break;
    case YT.PlayerState.PLAYING:
      this.trigger('PLAYING');
      break
    case YT.PlayerState.PAUSED:
      this.trigger('PAUSED');
      break
    case YT.PlayerState.BUFFERING:
      this.trigger('BUFFERING');
      break;
    case YT.PlayerState.CUED:
      this.trigger('LOADED');
      break;
    }
  }
}, whale.get('grp.Stream'));
function onYouTubeIframeAPIReady() { whale.get('grp.Stream.youtube')._doReady(); }