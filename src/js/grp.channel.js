whale.Service('grp.channel', ['grp.api'], {
  LOADED: false,
  EXISTS: false,
  OWNED: null,
  OWNER: null,
  CREATED: null,
  tracks: {},
  pollData: {
    'trackId': null,
    'nextId': null,
    'status': 'UNSET',
    'time': null,
    'offset': null
  },

  construct: function(api) {
    this.api = api;
    this.NAME = CHANNEL_NAME;
    this.EXISTS = CHANNEL_EXISTS;
  },

  load: function() {
    if (!this.EXISTS) return (new Promise()).reject('Channel does not exist yet');
    return this.api.loadChannel(this.NAME).done(function(data) {
      if (data) {
        this.pollData = this._parsePoll(data.poll);
        this.CHAN_ID = data.channel.id;
        this.CREATED = new Date(data.channel.created.replace(/-/g,"/"));
        this.OWNED = data.channel.owned;
        this.OWNER = data.channel.owner;
        this.tracks = this._parseTracks(data.tracks);
        this.trigger('LOADED');
      }
    }, this);
  },

  create: function() {
    if (this.EXISTS) return (new Promise()).reject('Channel already exists');
    return this.api.createChannel(this.NAME).done(function() {
      this.EXISTS = true;
      this.trigger('CREATED');
      this.load();
    }, this);
  },

  poll: function() {
    if (!this.EXISTS) return (new Promise()).reject('Channel does not exist yet');
    if (!this.LOADED) return (new Promise()).reject('Channel must be loaded first');
    return this.api.poll(this.CHAN_ID).done(function(data) {
      if (data) {
        this.pollData = this._parsePoll(data);
        this.trigger('POLL', this.pollData);
      }
    }, this);
  },

  _parsePoll: function(pollData) {
    return (pollData.status == 'UNSET') ? {
        'trackId': null,
        'nextId': null,
        'status': 'UNSET',
        'time': null,
        'offset': null
    } : {
        'trackId': pollData.track_id,
        'nextId': pollData.next,
        'status': pollData.status,
        'time': new Date(pollData.replace(/-/g,"/")),
        'offset': parseInt(pollData.offset)
    };
  },

  _parseTracks: function(trackData) {
    var ts = {};
    for (var t in trackData) {
      ts[t] = whale.make('grp.channel.track', trackData[t]);
    }
    return ts;
  },

  setPoll: function(pollData) {
    if (!this.EXISTS) return (new Promise()).reject('Channel does not exist yet');
    if (!this.LOADED) return (new Promise()).reject('Channel must be loaded first');
    if (!this.OWNED) return (new Promise()).reject('Only owners can set the poll');

    return this.api.setPoll(this.CHAN_ID, pollData).done(function() {
      this.trigger('POLL_SET');
    }, this);
  },

  addTrack: function(name, url, number) {
    // if (!this.OWNED) return (new Promise()).reject('Only owners can add tracks');
    // if (!this.LOADED) return (new Promise()).reject('Channel must be loaded first');

    var p = this.api.addTrack(this.CHAN_ID, name, url, number);
    p.done(function(data) {
      if (data) {
        var track = whale.make('grp.channel.track', data);
        this.tracks[track.TRACK_ID] = track;
        this.trigger('TRACK_ADDED', track);
      } else {
        this.trigger('TRACK_ADDED_FAIL');
      }
    }, this);
    return p;
  },

  getTrack: function(id) {
    return this.tracks[id];
  }

}, 'whale.Events');