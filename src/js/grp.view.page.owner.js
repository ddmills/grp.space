whale.View('grp.view.page.owner.tracklist', [], {

});
whale.Factory('grp.view.page.owner', ['grp.channel', 'grp.view.common.loader'], {
  construct: function(Channel, Loader) {
    this.channel = Channel;
    this.loader = new Loader;
    this.loader.render('.loader-container');
    this.listen(this.channel, 'LOADED', this.onChannelLoad, this);
    this.channel.load();
  },
  onChannelLoad: function() {
    this.loader.hide();
  }
}, 'whale.Events');
whale.make('grp.view.page.owner');