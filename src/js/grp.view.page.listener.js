whale.Factory('grp.view.page.listener', ['grp.channel', 'grp.control', 'grp.view.common.loader'], {
  construct: function(Channel, Control, Loader) {
    this.channel = Channel;
    this.control = Control;

    this.loader = new Loader;
    this.loader.render('.loader-container');

    this.listen(this.channel, 'LOADED', this.onChannelLoad, this);

    this.subViews = {};
    this.subViews.player = whale.make('grp.view.player');

    this.channel.load();
  },

  onChannelLoad: function() {
    this.loader.hide();
    this.control.applyPoll(this.channel.pollData);
    setInterval(this.doPoll.bind(this), 5000);
  },

  doPoll: function() {
    this.channel.poll().done(function() {
      this.control.applyPoll(this.channel.pollData);
    }, this);
  }

}, 'whale.Events');

whale.make('grp.view.page.listener');