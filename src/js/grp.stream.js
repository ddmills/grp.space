whale.Service('grp.streams', [], {
  construct: function() {
    this.strategies = [];
    this.strategy = null;
  },

  getStream: function(state) {
    for (var strat in this.strategies) {
      if (this.strategies[strat].canHandle(state.track.URL_TYPE)) {
        return this.setStream(this.strategies[strat], state);
      }
    }
    return false;
  },

  registerStream: function(strategy) {
    this.strategies.push(strategy);
    return this;
  },

  setStream: function(stream, state) {
    if (this.strategy !== stream) {
      if (this.strategy != null) this.strategy.teardown();
      this.strategy = stream;
      this.strategy.setup(state);
    }
    return this.strategy;
  }
});

whale.Factory('grp.stream', ['grp.streams'], {
  READY: false,
  construct: function(Streams) {
    Streams.registerStream(this);
  },
  setup: function(state) {
    return false;
  },
  teardown: function() {
    return false;
  },
  canHandle: function(type) {
    return false;
  },
  play: function() {
    return false;
  },
  pause: function() {
    return false;
  },
  load: function(url) {
    return false;
  },
  getOffset: function() {
    return 0;
  },
  setOffset: function(offset) {
    return false;
  },
  getVolume: function() {
    return 0;
  },
  setVolume: function(volume) {
    return false;
  },
  mute: function() {
    return false;
  },
  unMute: function() {
    return false;
  },
  isMuted: function() {
    return false;
  },
  duration: function() {
    return false;
  },
  show: function() {
    return false;
  },
  hide: function() {
    return false;
  }
}, 'whale.Dispatcher');