whale.Service('grp.Streams', [], {
  construct: function() {
    this.strategies = [];
    this.strategy = null;
  },

  getStream: function(type) {
    for (var strat in this.strategies) {
      if (this.strategies[strat].canHandle(type)) {
        this.strategy = this.strategies[strat];
        return this.strategy;
      }
    }
    return false;
  },

  registerStream: function(strategy) {
    this.strategies.push(strategy);
    return this;
  },
});

whale.register('grp.Stream', whale.Dispatcher.extend({
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
}));