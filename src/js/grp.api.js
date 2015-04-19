whale.Service('grp.api', ['whale.Ajax'], {
  base: '../api/',
  parse: true,

  construct: function(ajax) {
    this.ajax = ajax;
  },

  loadChannel: function(channelName) {
    return this.ajax.get({
      'url': this.base + 'channel/' + channelName +'/load',
      'parse' : this.parse
    });
  },

  getChannel: function(channelName) {
    return this.ajax.get({
      'url': this.base + 'channel/' + channelName,
      'parse' : this.parse
    });
  },

  createChannel: function(channelName) {
    return this.ajax.post({
      'url': this.base + 'channel/' + channelName,
      'parse': this.parse
    });
  },

  getTracks: function(channelId) {
    return this.ajax.get({
      'url': this.base + 'tracks/' + channelId,
      'parse': this.parse
    });
  },

  getTrack: function(channelId, trackId) {
    return this.ajax.get({
      'url': this.base + 'tracks/' + channelId + '/' + trackId,
      'parse': this.parse
    });
  },

  addTrack: function(channelId, name, url, number) {
    return this.ajax.post({
      'url': this.base + 'tracks/' + channelId,
      'parse': this.parse,
      'data': {
        'track_name': name,
        'track_url': url,
        'track_number': number
      }
    });
  },

  poll: function(channelId) {
    return this.ajax.get({
      'url': this.base + 'poll/' + channelId,
      'parse': this.parse
    });
  },

  setPoll: function(channelId, pollData) {
    return this.ajax.post({
      'url': this.base + 'poll/' + channelId,
      'parse': this.parse,
      'data': pollData
    });
  }
});