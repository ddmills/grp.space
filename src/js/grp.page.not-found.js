// # Channel-not-found page
whale.View('grp.Views.page.not-found', ['grp.Views.common.loader', 'grp.api'], {
  loadingTitle: '<i class="fa fa-fw fa-plus-circle"></i> Creating channel&hellip;',
  redirectTitle: '<i class="fa fa-fw fa-refresh"></i> Channel created - redirecting',
  construct: function(Loader, API) {
    this.API = API;
    this.loader = new Loader;
    this.element = whale.Dom.find('#not-found-container');
    var btn = this.element.find('.btn-create-channel');
    btn.on('click', this.doCreate, this);
  },

  setTitle: function(text) {
    this.element.find('.channel-title').html(text);
  },

  doCreate: function() {
    this.loader.render('.loader-container');
    this.setTitle(this.loadingTitle);
    this.element.find('.create-channel-container').hide();
    this.API.createChannel(CHANNEL_NAME).done(function() {
      this.loader.hide();
      this.setTitle(this.redirectTitle);
      location.reload();
    }, this);
  }
});
whale.make('grp.Views.page.not-found');