whale.Factory('grp.view.page.owner.tracklist', ['grp.channel', 'grp.control'], {
  trackTemplate: whale.util.template('<li data-track="{{-trackId}}">{{-trackName}} <i class="fa fa-play"></i></li>'),
  construct: function(Channel, Control) {
    this.channel = Channel;
    this.control = Control;

    var cont = whale.Dom.find('.tracklist-container');

    this.el = {
      'inputs': {
        'name': cont.find('.tracklist-add-name'),
        'url': cont.find('.tracklist-add-url'),
        'addbtn': cont.find('.tracklist-add-btn')
      },
      'list': cont.find('.tracklist'),
      'container': cont
    }

    // bind to element events
    this.el.inputs.addbtn.on('click', this.addTrack, this);
    this.el.inputs.addbtn.on('click', this.addTrack, this);

    // listen to channel events
    this.listen(this.channel, 'LOADED', this.onChannelLoad, this);
    this.listen(this.channel, 'TRACK_ADDED', this.onTrackAdded, this);
  },

  onChannelLoad: function() {
    this.el.container.show();
    this.renderTracks();
  },

  renderTrack: function(track) {
    var ob, json = {
      'trackId': track.TRACK_ID,
      'trackName': track.NAME
    };

    ob = new whale.Dom.Node(this.trackTemplate(json));
    ob.on('click', function(e) {
      this.setTrack(e.data('track'));
    }, this);

    this.el.list.append(ob);
    return this;
  },

  renderTracks: function() {
    for (var i in this.channel.tracks) {
      this.renderTrack(this.channel.getTrack(i));
    }
    return this;
  },

  setTrack: function(id) {
    this.control.playTrack(this.channel.getTrack(id), 0);
    return this;
  },

  addTrack: function() {
    var name, url;

    name = this.el.inputs.name.val();
    url = this.el.inputs.url.val();
    num = this.channel.tracks.length + 1;

    if (name.length > 0 && url.length > 0) {
      this.channel.addTrack(name, url, num);
      this.el.inputs.name.val('');
      this.el.inputs.url.val('');
    }
    return this;
  },

  onTrackAdded: function(c, track) {
    this.renderTrack(track);
    return this;
  }

}, 'whale.Events');

whale.Factory('grp.view.page.owner', ['grp.channel', 'grp.view.common.loader'], {
  construct: function(Channel, Loader) {
    this.channel = Channel;
    this.loader = new Loader;
    this.loader.render('.loader-container');

    this.listen(this.channel, 'LOADED', this.onChannelLoad, this);

    this.subViews = {};
    this.subViews.tracklist = whale.make('grp.view.page.owner.tracklist');
    this.subViews.player = whale.make('grp.view.player');

    this.channel.load();
  },

  onChannelLoad: function() {
    this.loader.hide();
  },


}, 'whale.Events');

whale.make('grp.view.page.owner');