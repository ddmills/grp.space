whale.Factory('grp.view.player', ['grp.control'], {
  construct: function(Control) {
    this.control = Control;

    var cont = whale.Dom.find('.player');

    this.el = {
      'controls': {
        'toggleVisual': cont.find('.player-controls-toggleVis'),
        'toggleMute': cont.find('.player-controls-toggleMute'),
        'volume': cont.find('.player-volume'),
        'volumeProg': cont.find('.player-volume-meter')
      },
      'info': {
        'track': cont.find('.player-info-title'),
        'duration': cont.find('.player-info-duration'),
        'current': cont.find('.player-info-current')
      },
      'meter': {
        'full': cont.find('.player-meter'),
        'buffer': cont.find('.player-meter-buffer'),
        'progress': cont.find('.player-meter-progress')
      },
      'container': cont
    }

    this.el.controls.toggleVisual.on('click', this.toggleVisual, this);
    this.el.controls.toggleMute.on('click', this.toggleMute, this);
    this.el.controls.volume.on('click', this.setVolume, this);

    this.listenOnce(this.control, 'LOADED', this.onControlLoad, this);
    this.listen(this.control, 'TRACK_LOADING', this.onTrackLoading, this);
    this.listen(this.control, 'TRACK_CHANGE', this.onTrackChange, this);

    setInterval(this.updateMeter.bind(this), 1000);

  },

  onControlLoad: function() {
    var v = this.control.getVolume();
    this.el.controls.volumeProg.css('width', v * 100 + '%');
  },

  toggleVisual: function() {
    if (this.control.state.show) {
      this.control.hide();
    } else {
      this.control.show();
    }
  },

  toggleMute: function() {
    if (this.control.state.muted) {
      this.control.unMute();
    } else {
      this.control.mute();
    }
  },

  setVolume: function(e, el) {
    var v = (e.pageX - el.offset().left) / el.width();
    this.control.setVolume(v);
    this.el.controls.volumeProg.css('width', v * 100 + '%');
  },

  updateMeter: function() {
    if (this.control.state.status == 'UNSET') {
      this.el.meter.progress.css('width', '0%');
    } else {
      var prog = (this.control.getProgress() * 100);
      this.el.meter.progress.css('width', prog + '%');
      this.el.info.current.html(this.control.getOffset());
    }
  },

  onTrackLoading: function() {
    this.el.container.show();
    this.el.info.track.html('loading');
    this.el.info.duration.html('~:~');
    this.el.info.current.html('~:~');
  },

  onTrackChange: function() {
    var track = this.control.state.track;
    this.el.info.track.html(track.NAME);
    this.el.info.duration.html(this.control.getDuration());
    this.el.info.current.html('~');
  }

}, 'whale.Events');