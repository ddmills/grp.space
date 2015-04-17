whale.Factory('grp.channel.track', ['grp.channel'], {
  construct: function(Channel, data) {
    this.channel = Channel;
    this.TRACK_ID = data.id;
    this.ACTIVE = data.active;
    this.URL = data.url;
    this.URL_TYPE = data.type;
    this.PLAYS = data.plays;
    this.NUMBER = data.number;
  },

  compareTo: function(other) {
    return this.NUMBER > other.NUMBER;
  }

});