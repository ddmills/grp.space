whale.Service('grp.api', ['whale.Ajax'], {
  base: '../api/',

  construct: function(ajax) {
    this.ajax = ajax;
  },

  createChannel: function(channelName) {
    return this.ajax.post(this.base + 'channel/' + channelName);
  }
});