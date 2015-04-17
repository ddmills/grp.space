whale.Factory('grp.channel.track', [], {
  construct: function(data) {
    this.TRACK_ID = data.id;
    this.CHAN_ID = data.channel;
    this.ACTIVE = data.active;
    this.TRACK_URL = data.url;
    this.URL_TYPE = data.type;
    this.PLAYS = data.plays;
    this.TRACK_NO = data.number;
  },

  compareTo: function(other) {
    return this.TRACK_NO > other.TRACK_NO;
  }
});