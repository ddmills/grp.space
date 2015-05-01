whale.Service('grp.control', ['grp.channel', 'grp.streams'], {
  OFFSET_DOF: .5,
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

  setTrack: function(track, poll) {
    if (this.state.track == null || track.TRACK_ID != this.state.track.TRACK_ID) {
      this.trigger('TRACK_LOADING');
      this.state.track = track;
      this.state.offset = poll.offset;
      this.stream = this.streams.getStream(this.state);
      this.listenOnce(this.stream, 'LOADED', this.trackLoaded, this);
      this.listenOnce(this.stream, 'LOADED', function() {
        this.state.status = 'UNSET';
        this.setTrack(track, poll);
      }, this);
      this.stream.load(track.TRACK_URL, this.calcOffset(poll.time, poll.offset));
    } else {
      if (poll.status == 'PLAYING' && this.state.status != 'PLAYING') this.play();
      if (poll.status == 'PAUSED'&& this.state.status != 'PAUSED') this.pause();
      if (poll.status == 'UNSET'&& this.state.status != 'UNSET') this.unset();
      var offset = this.calcOffset(poll.time, poll.offset);
      var dof = Math.abs(this.getOffset() - offset);
      if (dof > this.OFFSET_DOF) {
        this.setOffset(offset);
      }
    }
  },

  unset: function() {
    console.log('unset stuff again');
  },

  applyPoll: function(poll) {

    if (poll.trackId && this.state.track == null || this.state.track.TRACK_ID != poll.trackId) {
      this.channel.fetchTrack(poll.trackId).done(function(data) {
        var track = whale.make('grp.channel.track', data);
        this.setTrack(track, poll);
      }, this);

    } else if (this.state.track.TRACK_ID == poll.trackId) {
      this.setTrack(this.state.track, poll);
    }
  },

  calcOffset: function(start, offset) {
    var now = (new Date).getTime();
    return ((now - start.getTime()) * 0.001) + offset;
  },

  sendPoll: function() {
    this.state.updated = new Date;
    var p = this.getPollData();
    this.channel.setPoll(p);
  },

  setOffsetDOF: function(dof) {
    this.OFFSET_DOF = dof;
  },

  getPollData: function() {
    return {
      'track_id': this.state.track && this.state.track.TRACK_ID,
      'next_id': null,
      'status': this.state.status,
      'time': whale.util.datetime(this.state.updated),
      'offset': this.getOffset()
    }
  },

  playTrack: function(track, offset) {
    this.trigger('TRACK_LOADING');
    this.state.track = track;
    this.state.offset = offset;
    this.stream = this.streams.getStream(this.state);
    this.listenOnce(this.stream, 'LOADED', this.play, this);
    this.listenOnce(this.stream, 'LOADED', this.trackLoaded, this);
    this.listenOnce(this.stream, 'LOADED', this.sendPoll, this);
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
  }
}, 'whale.Events');