whale.Factory('grp.view.page.owner.tracklist', ['grp.channel'], {
  trackTemplate: whale.util.template('<li data-track="{{-trackId}}">{{-trackName}} <i class="fa fa-play"></i></li>'),
  construct: function(Channel) {
    this.channel = Channel;
    this.element = whale.Dom.find('.tracklist-container');
    this.trackContainer = this.element.find('.tracklist');

    this.element.find('.tracklist-add-btn').on('click', this.addTrack, this);

    this.listen(this.channel, 'LOADED', this.onChannelLoad, this);
    this.listen(this.channel, 'TRACK_ADDED', this.onTrackAdded, this);
  },

  onChannelLoad: function() {
    this.element.show();
    this.renderTracks();
  },

  renderTrack: function(track) {
    json = {
      'trackId': track.TRACK_ID,
      'trackName': track.NAME
    };
    this.trackContainer.append(this.trackTemplate(json));
    return this;
  },

  renderTracks: function() {
    for (var i in this.channel.tracks) {
      this.renderTrack(this.channel.tracks[i]);
    }
    return this;
  },

  addTrack: function() {
    var name, url;

    name = this.element.find('.tracklist-add-name').val();
    url = this.element.find('.tracklist-add-url').val();
    num = this.channel.tracks.length + 1;

    if (name.length > 0 && url.length > 0) {
      this.channel.addTrack(name, url, num);
      this.element.find('.tracklist-add-name').val(' ');
      this.element.find('.tracklist-add-url').val(' ');
    }
  },

  onTrackAdded: function(c, track) {
    this.renderTrack(track);
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

    this.channel.load();
  },

  onChannelLoad: function() {
    this.loader.hide();
  },


}, 'whale.Events');

whale.make('grp.view.page.owner');