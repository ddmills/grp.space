whale.Service('grp.api', ['whale.Ajax'], {
  base: '../api/',
  parse: true,

  construct: function(ajax) {
    this.ajax = ajax;
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
  }
});