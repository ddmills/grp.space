var streams = whale.get('grp.Streams');
var strat = streams.getStream('youtube');

// # grp.Views.util.loader
// util.loader is view for showing and hiding a little loading symbol
// in a container.
whale.View('grp.Views.util.loader', [], {
  template: '<div class="loader"><i class="fa fa-2x fa-cog fa-spin"></i></div>',
  construct: function() {
    this.element = new whale.Node(this.template);
    this.container = null;
  },

  render: function(selector) {
    this.container = whale.Dom.find(selector);
    this.container.html(this.element);
    return this;
  },

  show: function() {
    this.element.show();
    return this;
  },

  hide: function() {
    this.element.hide();
    return this;
  }
});

whale.View('grp.Views.page.not-found', ['grp.Views.util.loader'], {
  construct: function(Loader) {
    this.element = whale.Dom.find('#not-found-container');
    this.loader = new Loader;
    this.loader.hide();
    this.loader.render('.loader-container');
    var btn = this.element.find('.btn-create-channel');
    btn.on('click', this.doCreate, this);
  },

  doCreate: function() {
    this.element.find('.create-channel-container').hide();
    this.loader.show();
  }
});

var loader = whale.make('grp.Views.page.not-found');