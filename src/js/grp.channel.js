whale.Service('grp.channel', ['grp.api'], {
  LOADED: false,
  EXISTS: false,
  construct: function(api) {
    this.api = api;
    this.NAME = CHANNEL_NAME;
    this.EXISTS = CHANNEL_EXISTS;
  },

  load: function() {
    if (!this.EXISTS) return (new Promise()).reject('Channel does not exist yet');
    var p = this.api.getChannel(this.NAME);
    p.done(function(data) {
      this.CHAN_ID = data.id;
      this.CREATED = data.created;
      this.OWNED = data.owned;
      this.OWNER = data.owner;
      this.LOADED = true;
      this.trigger('LOADED');
    }, this);
    return p;
  },

  create: function() {
    if (this.EXISTS) return (new Promise()).reject('Channel already exists');
    var p = this.api.createChannel(this.NAME);
    p.done(function() {
      this.EXISTS = true;
      this.trigger('CREATED');
      this.load();
    }, this);
    return p;
  }

}, 'whale.Events');