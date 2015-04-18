// # grp.Stream.youtube
// This service is an adapter for the youtube api.
// Like all adapters, this extends the grp.Stream object.
whale.Service('grp.stream.youtube', [], {
  DEFAULT_WIDTH: 640,
  DEFAULT_HEIGHT: 360,
  api: null,
  IS_LOADING: false,
  WAS_MUTED: false,
  SILENT: false,
  OFFSET: 0,
  AVG_BUFF_COUNT: 0,
  AVG_BUFF_TIME: 0,
  AVG_BUFF_TIME_TOTAL: 0,
  CUR_BUFF_START: null,
  setup: function(state) {
    this.SILENT = true;
    this.setVolume(state.volume);
    state.muted ? this.mute() : this.unMute();
    state.show ? this.show() : this.hide();
    this.SILENT = false;
  },
  teardown: function() {
    this.SILENT = true;
    this.mute();
    this.pause();
    this.hide();
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
  load: function(url, offset) {
    if (!this.IS_LOADING) {
      this.IS_LOADING = true;
      this.OFFSET = offset;
      this.WAS_MUTED = this.isMuted();
      this.mute();
      this.api.pauseVideo();
      this.CUR_BUFF_START = (new Date).getTime();
      this.api.loadVideoById(url, offset);
      return true;
    }
    return false;
  },
  getOffset: function() {
    return this.api.getCurrentTime();
  },
  setOffset: function(offset) {
    this.OFFSET = offset;
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
        'showinfo': 0,
        'disablekb': 1,
        'modestbranding': 1,
        'enablejsapi': 1,
        'iv_load_policy': 3,
        'origin': 'http://grp.space'
      }
    });
    this.api.addEventListener('onStateChange', this._handleStateChange.bind(this));
    this.READY = true;
    this.trigger('READY');
  },
  _handleStateChange: function(e) {
    if (this.SILENT) return;
    switch (e.data) {
    case YT.PlayerState.ENDED:
      this.trigger('ENDED');
      break;
    case YT.PlayerState.PLAYING:
      if (this.IS_LOADING) {
        this.AVG_BUFF_COUNT++;
        var curDif = (new Date).getTime() - this.CUR_BUFF_START;
        this.AVG_BUFF_TIME_TOTAL += curDif;
        this.AVG_BUFF_TIME = (this.AVG_BUFF_TIME_TOTAL / this.AVG_BUFF_COUNT) * 0.001;
        this.WAS_MUTED ? this.mute() : this.unMute();
        this.api.seekTo(this.OFFSET + curDif * 0.001, true);
        this.api.pauseVideo();
        this.IS_LOADING = false;
        this.trigger('LOADED');
      } else {
        this.trigger('PLAYING');
      }
      break;
    case YT.PlayerState.PAUSED:
      if (!this.IS_LOADING) this.trigger('PAUSED');
      break
    case YT.PlayerState.BUFFERING:
      this.trigger('BUFFERING');
      break;
    case YT.PlayerState.CUED:
      this.trigger('CUED');
      break;
    }
    if (!this.IS_LOADING) this.trigger('CHANGE');
  }
}, 'grp.stream');

// this function will be called by the youtube api when it's ready
function onYouTubeIframeAPIReady() { whale.get('grp.stream.youtube')._doReady(); }