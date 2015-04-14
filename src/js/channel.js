whale.register('Controls', whale.Dispatcher.extend({
  construct: function() {
    console.log ('hello');
  },

  doStuff: function() {
    console.log('stuff');
  }
}));