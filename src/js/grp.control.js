whale.Service('grp.control', ['grp.channel', 'grp.streams'], {
  construct: function(Channel, Streams, Player) {
    this.channel = Channel;
    this.streams = Streams;
    this.streams = Player;
  },

  playTrack: function(track) {
    console.log('PLAY');
    console.log(track);
  }
}, 'whale.Events');