whale.Service('grp.control', ['grp.channel', 'grp.streams'], {
  construct: function(Channel, Streams, Player) {
    this.channel = Channel;
    this.streams = Streams;
    this.player = Player;
    this.stream = whale.make('grp.stream');
    this.state = {
      'status': 'UNSET',
      'show': true,
      'offset': 0,
      'volume': .75,
      'muted': false,
      'track': null,
      'owner': false
    };
    this.listenOnce(this.channel, 'LOADED', function() {
      this.state.owner = this.channel.OWNER;
      this.trigger('LOADED');
    }, this);
  },

  setTrack: function(track, offset) {
    this.trigger('TRACK_LOADING');
    this.state.track = track;
    this.state.offset = offset;
    this.stream = this.streams.getStream(this.state);
    this.listenOnce(this.stream, 'LOADED', this.trackLoaded, this);
    this.stream.load(track.TRACK_URL, offset);
  },

  playTrack: function(track, offset) {
    this.trigger('TRACK_LOADING');
    this.state.track = track;
    this.state.offset = offset;
    this.stream = this.streams.getStream(this.state);
    this.listenOnce(this.stream, 'LOADED', this.play, this);
    this.listenOnce(this.stream, 'LOADED', this.trackLoaded, this);
    this.stream.load(track.TRACK_URL, offset);
  },

  trackLoaded: function() {
    this.trigger('TRACK_CHANGE');
  },

  play: function() {
    this.state.status = 'PLAYING';
    this.stream.play();
  },

  pause: function() {
    this.state.status = 'PAUSED';
    this.stream.pause();
  },

  setOffset: function(offset) {
    this.state.offset = offset;
    this.stream.setOffset(offset);
  },

  show: function(){
    this.state.show = true;
    this.stream.show();
  },

  hide: function() {
    this.state.show = false;
    this.stream.hide();
  },

  mute: function() {
    this.state.muted = true;
    this.stream.mute();
  },

  unMute: function() {
    this.state.muted = false;
    this.stream.unMute();
  },

  getOffset: function() {
    return this.stream.getOffset();
  },

  getDuration: function() {
    return this.stream.duration();
  },

  getProgress: function() {
    var dur = this.stream.duration();
    if (typeof dur == 'undefined' || dur == 0) return 0;
    return this.getOffset()/dur;
  },

  setVolume: function(v) {
    this.state.volume = v;
    this.stream.setVolume(v);
  },

  getVolume: function() {
    return this.state.volume;
  },

  getPollInfo: function() {

  }
}, 'whale.Events');