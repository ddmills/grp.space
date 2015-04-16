// # grp.Views.common.loader
// util.loader is view for showing and hiding a little loading symbol
// in a container.
whale.View('grp.Views.common.loader', [], {
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